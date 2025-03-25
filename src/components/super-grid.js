import StudentCard from "./student-card.js";
import StudentService from "../services/student-service.js";

export default class SuperGrid extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.style()
        this.render()
    }

    style(){
        const style = document.createElement('style');
        style.innerText = `
            .grid{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }
        `
        this.shadowRoot.appendChild(style);
    }

    async render(){


        this.studentServ = new StudentService();
        this.students = await this.studentServ.loadStudents();

        const controlsDiv = document.createElement('div');

        const btn = document.createElement('button');
        btn.appendChild(document.createTextNode('add'));
        btn.addEventListener('click', () => {
            const sDialog = document.getElementById('student-dialog');
            sDialog.addStudent()
        })

        controlsDiv.appendChild(btn);

        this.shadowRoot.appendChild(controlsDiv);

        const main = document.createElement('div');
        main.classList.add('grid')
    
        for (const student of this.students) {
            
            const card = document.createElement('student-card');
            card.setAttribute('selected-student', JSON.stringify(student));
    
            main.appendChild(card)
        }

        this.shadowRoot.appendChild(main)
    }

}


customElements.define('super-grid', SuperGrid)