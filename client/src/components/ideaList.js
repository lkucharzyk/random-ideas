import e from "cors";
import IdeasAPI from "../services/ideasAPI";

class IdeaList{
    constructor(){
        this._ideaListEL = document.querySelector('#idea-list');
        this.ideas =[]

          this.getIdeas(); 
          this._validTags = new Set;
          this._validTags.add('technology');
          this._validTags.add('software');
          this._validTags.add('business');
          this._validTags.add('education');
          this._validTags.add('health');
          this._validTags.add('inventions');
    }

    addEventListeners(){
      this._ideaListEL.addEventListener('click', e =>{
        if(e.target.classList.contains('fa-times')){
          e.stopImmediatePropagation();
          const IdeaId = e.target.parentElement.parentElement.dataset.id;
          this.deleteIdea(IdeaId);

        }
      })
    }

   async getIdeas(){
      try {
        const res = await IdeasAPI.getIdeas();
        this.ideas = res.data.data;
        this.redner();
      } catch (error) {
        console.log(error);
      }
    }

    async deleteIdea(ideaId){
      try {
        //server
        const res = await IdeasAPI.deleteIdea(ideaId)
        //DOM
        this.ideas.filter(idea => idea.id !== ideaId);
        this.getIdeas();
      } catch (error) {
        alert('cnt dlt')
      }
    }

    addIdeaToList(idea){
      this.ideas.push(idea);
      this.redner();
    }
    
    getTagClass(tag){
        tag = tag.toLowerCase();
        let tagClass = '';
        if(this._validTags.has(tag)){
            tagClass = `tag-${tag}`
        }
        return tagClass
    }

    redner(){
        this._ideaListEL.innerHTML = this.ideas.map((idea => {
            const tagClass = this.getTagClass(idea.tag);
            return ` <div class="card" data-id="${idea._id}">
            ${idea.username === localStorage.getItem('username') ? '<button class="delete"><i class="fas fa-times"></i></button>' : '' }
            <h3>
              ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag}</p>
            <p>
              Posted on <span class="date">${idea.date}</span> by
              <span class="author">${idea.username}</span>
            </p>
          </div>`
        })).join('');
        this.addEventListeners();
    }
}
export default IdeaList