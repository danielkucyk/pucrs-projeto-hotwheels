import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function CarForm (){
    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [cor, setCor] = useState('')
    const [ano, setAno] = useState('')
    const navigate = useNavigate();

    const apiUrl = 'http://localhost:5000/cars';
 
    async function adicionarCarro () {
        const carData = await axios.get(apiUrl);
        let carId = 1;
        if (carData.data.length>0) {
            carId = carData.data[carData.data.length-1].id + 1;
        }
        const novoCarro = {id:carId ,name: nome, brand:marca, color:cor, year:ano};
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();

        if (!nome.trim()){
            alert("Insira o nome do carro")
        } else if (!marca.trim()){
            alert("Insira a marca do carro")
        } else if (!cor.trim()){
            alert("Insira a cor do carro")
        } else if (!ano.trim()){
            alert("Insira o ano do carro")
        } else if (isNaN(ano) || ano < 1886 || ano > (anoAtual + 1)){
            alert("Insira um ano válido")
        } else {
            await axios.post(apiUrl,novoCarro);
            navigate('/carsList');
        }
    }

    return(
        <div className="flex flex-col items-center mt-12">
            <div className="flex relative items-center flex-col border-solid border-1 rounded-xl overflow-hidden shadow-md shadow-black border-black h-1/2 w-[700px] gap-4">
                <h1 className="text-[36px] font-mono text-black font-bold">Adicionar Carro</h1>
                <div className='flex w-full px-20 gap-2 items-center'>
                    <label className='font-mono text-xl w-1/5 text-end'>
                        Nome:
                    </label>
                    <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)} placeholder="Nome" className='w-full border rounded-lg px-2 py-1 outline-none outline-offset-0 focus:outline-2 focus:outline-black '/>
                </div>
                <div className='flex w-full px-20 gap-2 items-center'>
                    <label className='font-mono text-xl w-1/5 text-end'>
                        Marca:
                    </label>
                    <input type="text" value={marca} onChange={(e)=>setMarca(e.target.value)} placeholder="Marca" className='w-full border rounded-lg px-2 py-1 outline-none outline-offset-0 focus:outline-2 focus:outline-black'/>
                </div>
                <div className='flex w-full px-20 gap-2 items-center'>
                    <label className='font-mono text-xl w-1/5 text-end'>
                        Cor:
                    </label>
                    <input type="text" value={cor} onChange={(e)=>setCor(e.target.value)} placeholder="Cor" className='w-full border rounded-lg px-2 py-1 outline-none outline-offset-0 focus:outline-2 focus:outline-black'/>
                </div>
                <div className='flex w-full px-20 gap-2 items-center'>
                    <label className='font-mono text-xl w-1/5 text-end'>
                        Ano:
                    </label>
                    <input type="text" value={ano} onChange={(e)=>setAno(e.target.value)} placeholder="Ano" className='w-full border rounded-lg px-2 py-1 outline-none outline-offset-0 focus:outline-2 focus:outline-black'/>
                </div>
                <div className='flex items-center w-1/2 my-4 h-10 gap-10'>
                    <button onClick={adicionarCarro} className='justify-center content-center bg-black hover:scale-[1.01] text-white font-mono w-[330px] h-full rounded-lg shadow-md shadow-black text-[20px] font-bold transition'>
                        Adicionar
                    </button>
                    <Link to='/carsList' data-cy="cancel-button" className='flex items-center justify-between font-mono font-bold text-[20px] bg-red-300 h-full p-2 rounded-lg shadow-md shadow-red-500 hover:bg-red-500 transition'>
                        Cancelar
                    </Link>
                </div>
            </div>
        </div>
    )
}