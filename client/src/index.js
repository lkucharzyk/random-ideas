import './css/style.css';
//import '@fortawesome/fontawesome-free/css/all.css';
import Modal from './components/modal';
import IdeaForm from './components/IdeaFrom';
import IdeaList from './components/ideaList';

new Modal;
const ideaForm = new IdeaForm;
ideaForm.render();
new IdeaList;

