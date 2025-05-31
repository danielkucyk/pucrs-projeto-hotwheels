export default function About() {
    return (
        <div className="flex flex-col items-center mt-12">
            <div className="flex relative items-center flex-col border-solid border-1 rounded-xl overflow-hidden shadow-md shadow-black border-black h-1/2 w-[700px]">
                <div className="text-[36px] font-mono text-black font-bold">Sobre</div>
                <div className="flex flex-col text-[22px] font-mono text-black text-left p-6 gap-4">
                    <p data-cy="text-about">Esta é uma aplicação para um CRUD de carros HotWheels!</p>
                    <p>Elaborada na disciplina de Desenvolvimento de Sistemas Frontend.</p>
                    <p>Do curso de Graduação Online da PUCRS.</p>
                </div>
            </div>
        </div>
    )
};