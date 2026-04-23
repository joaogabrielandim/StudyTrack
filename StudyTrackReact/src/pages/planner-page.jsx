import Navbar from "../components/Navbar"
import "./planner-page.css"


function Planner() {
    return(
        <div className="body-planner">
        <Navbar/>
        
        <div className="conteudo-planner">
            <div className="principal-planner" >
                <div className="tarefas-planner">
                    <h2>Suas tarefas</h2>
                    <div>[Colocar tarefas aqui]</div>
                </div>
                <div className="eventos-planner">
                    <h2>Seus eventos</h2>
                    <div>[Colocar eventos aqui]</div>
                </div>
            </div>
                <div className="calendario-planner">
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=SEU_CALENDARIO%40gmail.com&ctz=America%2FSao_Paulo"
                    style={{ border: 0, height: "90%", width: "100%" }}
                    title="Google Calendar"
                ></iframe>
            </div>
        </div>
        </div>
    )
}

export default Planner;