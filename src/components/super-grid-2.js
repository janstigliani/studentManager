import StudentCard from "./student-card.js";
import StudentService from "../services/student-service.js";

export default class SuperGrid2 extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback(){

        this.studentServ = new StudentService();
        this.students = await this.studentServ.loadStudents();

        const sDialog = document.getElementById('student-dialog');
        sDialog.addEventListener('student-added', (event) => {
            const newStudent = event.detail;
            this.students = this.studentServ.addStudent(newStudent);
            this.render();
        });

        sDialog.addEventListener('student-edited', (event) => {
            const newStudent = event.detail.student;
            const index = event.detail.index;
            this.students = this.studentServ.editStudent(newStudent, index);
            this.render()
        });

        this.style()
        this.render()
    }


    style(){
        const style = document.createElement('style');
        style.innerText = `
            :host{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }
        `
        this.shadowRoot.appendChild(style);
    }

    render(){

        
    
        for (let i = 0; i  < this.students.length; i++) {
            const student = this.students[i];
            const card = document.createElement('student-card');
            card.setAttribute('selected-student', JSON.stringify(student));
            card.setAttribute('selected-index', i);
            this.shadowRoot.appendChild(card)
        }

        
    }

    

}


customElements.define('super-grid-2', SuperGrid2)