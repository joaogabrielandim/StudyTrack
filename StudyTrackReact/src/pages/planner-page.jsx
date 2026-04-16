import Navbar from "../components/Navbar"
import "./planner-page.css"


function Planner() {
    return(
        <div className="body">
        <Navbar/>
        
        <div className="conteudo">

            <div className="tarefas">
            <h2>Suas tarefas</h2>
            <div>[Colocar tarefas aqui]</div>
            </div>
            <div className="eventos">
            <h2>Seus eventos</h2>
            <div>[Colocar eventos aqui]</div>
            </div>
            <div className="calendario">
            <iframe
                src="https://calendar.google.com/calendar/embed?src=SEU_CALENDARIO%40gmail.com&ctz=America%2FSao_Paulo"
                style={{ border: 0 }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
                title="Google Calendar"
            ></iframe>
            </div>
        </div>
        </div>
    )
}

export default Planner;