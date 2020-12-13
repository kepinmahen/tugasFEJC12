import React from 'react'
import Axios from 'axios'
import { api_url } from '../helpers/api_url'
import { Button, Input } from 'reactstrap'
class Home extends React.Component{
    state = {
        userData: [],
        dataa: {
            nama: "",
            usia: "",
            pekerjaan: "",
        },
        change: true
    }
    componentDidMount() {
        Axios.get(`${api_url}/user`)
        .then((res) => {
            this.setState({
                userData: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidUpdate(prevProps, prevState) {
		if (this.state.change !== prevState.change) {
			Axios.get(`${api_url}/user`)
				.then((res) => {
					this.setState({
						userData: res.data,
					});
					console.log("updated");
				})
				.catch((err) => {
					console.log(err);
				});
}
    }
    renderdata = () => {
       let newArr =  this.state.userData.map((val) => {
           return (
               <tr>
                   <td>{val.nama}</td>
                   <td>{val.usia}</td>
                   <td>{val.pekerjaan}</td>
                   <td><Button>Delete</Button></td>
                   <td><Button>Edit</Button></td>
               </tr>
           )
       })
       return newArr;
    }
    onchangeinput = (e) => {
        this.setState({
            dataa: {
                ...this.state.dataa,
                [e.target.id]: e.target.value
            }
        })
        console.log(e.target.value)
    }

    addData = () => {
        // const{
        //     nama,
        //     usia,
        //     pekerjaan,
        // }=this.state.dataa
        Axios.post(`${api_url}/user`,this.state.dataa)
            
        .then((res) => {
            this.setState({
                // userData: [this.state.dataa],
                change: !this.state.change
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    cek = () => {
        console.log(this.state.dataa)
    }
    render(){
        return(
            <div>
                <button onClick={this.cek}>Klik</button>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control'>
                            <option>Filter By Pekerjaan</option>
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderdata()}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <Input type='text' className='form-control' placeholder='Nama' value={this.state.nama} id= 'nama' onChange={this.onchangeinput}/> </div>
                    <div className='col-md-3'> <Input type='text' className='form-control' placeholder='Usia' value={this.state.usia} id= 'usia' onChange={this.onchangeinput}/> </div>
                    <div className='col-md-3'> <Input type='text' className='form-control' placeholder='Pekerjaan' value={this.state.pekerjaan} id= 'pekerjaan' onChange={this.onchangeinput}/> </div>
                    <div className='col-md-3'> <Button onClick={()=>this.addData()}type='button' className='form-control btn-info' value='add Data' id= 'add Data' >Add Data </Button></div>
                </div>
            </div>
        )
    }
}

export default Home