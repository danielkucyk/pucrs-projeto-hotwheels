import logo from "../../assets/home.jpg"

export default function Home(){
    return (
        <div className="flex items-center flex-col mt-12">
            <div className="flex relative items-center flex-col border-solid border-1 rounded-xl overflow-hidden shadow-md shadow-black border-black h-1/2 w-[700px]">
                <img src={logo} className="" alt="logo"/>
                <div data-cy="page-title" className="text-[36px] absolute bottom-0 font-mono text-white font-bold">Bem-vindo ao CRUD de HotWheels!</div>
            </div>
        </div>
    )
}