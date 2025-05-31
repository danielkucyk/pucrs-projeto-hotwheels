import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { SvgIcon } from '@mui/material';
import listIcon from '../../assets/listIcon.jpg'

const apiUrl = 'http://localhost:5000/cars';

export default function CarsList() {
    const [updateList, setUpdateList] = useState(0)

    async function removerCarro(id) {
        await axios.delete(`${apiUrl}/${id}`).catch((err)=>{console.log("Erro ao deletar item:", err)})
        setUpdateList(updateList + 1)
        console.log(updateList);
    }

    const [list, setList] = useState(null)

    useEffect(() => {
        async function getCars() {
            const response = await axios.get(apiUrl).catch((err)=>{console.log("Erro ao buscar lista:", err)});
            setList(response.data);
        }
        getCars()
    },[updateList]);

    if (!list) return ( 
        <div className="flex flex-col items-center mt-12">
            <div className="flex relative items-center flex-col border-solid border-1 rounded-xl overflow-hidden shadow-md shadow-black border-black h-1/2 w-[700px] gap-4">
                <h1 className="text-[36px] font-mono text-black font-bold">Lista de Carros</h1> 
                <p className='my-12 font-mono text-[16px]'>
                    Não foi possível obter a lista de carros.
                </p>
            </div>
        </div>
    );

    return (
    <div className="flex flex-col items-center mt-12">
        <div className="flex relative items-center flex-col border-solid border-1 rounded-xl overflow-hidden shadow-md shadow-black border-black h-1/2 w-[700px] gap-4">  
            <h1 data-cy='list-title' className="text-[36px] font-mono text-black font-bold">Lista de Carros</h1>     
            {list.length === 0 && <p className='my-12 font-mono text-[16px]'>Não há carros registrados.</p>}  
            {list.length > 0 && list.map((carro) => {
                return (
                    <div key={carro.id} data-cy="car-item" className="flex justify-center w-full items-center gap-5">
                        <Link to='/CarDetail' state={{from: carro}} className="flex items-center gap-10 w-2/4 shadow-md shadow-slate-300 rounded-full transition hover:font-bold hover:bg-[#f6fafb]">
                            <img src={listIcon} alt="listIcon" className='rounded-full h-[60px]'/>
                            <div className='font-mono text-[20px] w-1/2 text-balance overflow-clip capitalize'>
                                {carro.name} - {carro.brand}
                            </div>
                        </Link>
                        <button data-cy="exluir-item" onClick={()=>{removerCarro(carro.id)}} className='flex items-center justify-between font-mono bg-red-300 h-full p-2 rounded-lg shadow-md shadow-red-500 hover:bg-red-500 transition'>
                            <SvgIcon component={DeleteIcon}/>
                            Excluir
                        </button>
                    </div>
                )})}
            <Link to='/carForm' data-cy="list-addCarro" className='flex justify-center bg-black hover:scale-[1.01] text-white font-mono my-6 w-[330px] h-full p-2 rounded-lg shadow-md shadow-black text-[20px] font-bold transition'>Adicionar Carro</Link>
        </div>
    </div>
    )
}