const Note={
	idCounter:8,
	dragged:null,
	proccess(noteElement){
		noteElement.addEventListener('dblclick',function(event){
			noteElement.setAttribute('contenteditable','true');
			noteElement.closest('.column').setAttribute('draggable','false');
			noteElement.focus();
			noteElement.setAttribute('draggable','false');
		});
		noteElement.addEventListener('blur',function(event){
			noteElement.setAttribute('contenteditable','false');
			noteElement.setAttribute('draggable','true');
			noteElement.closest('.column').setAttribute('draggable','true');
			if(!noteElement.textContent.length){
				noteElement.remove();
			}
		});

		noteElement.addEventListener('dragstart',Note.dragstart);
		noteElement.addEventListener('dragend',Note.dragend);
		noteElement.addEventListener('dragenter',Note.dragenter);
		noteElement.addEventListener('dragleave',Note.dragleave);
		noteElement.addEventListener('dragover',Note.dragover);
		noteElement.addEventListener('drop',Note.drop);	
	},

	dragstart(event){
		Note.dragged = this;
		this.classList.add('dragged');
	},

	dragend(event){
		this.classList.remove('dragged');
		Note.dragged=null;

		document.querySelectorAll('.note').forEach(x=>x.classList.remove('under'));
	},

	dragenter(event){
		if(this===Note.dragged){
			return;
		}
		this.classList.add('under');
		
	},

	dragleave(event){
		if(this===Note.dragged){
			return;
		}
		this.classList.remove('under');
		
	},

	dragover(event){
		if(this===Note.dragged){
			return;
		}
		event.preventDefault();
	},

	drop(event){
		event.stopPropagation();
		if(this===Note.dragged){
			return;
		}



		if(this.parentElement===Note.dragged.parentElement){
			const note = Array.from(Note.dragged.parentElement.querySelectorAll('.note'));
			const indexA = note.indexOf(this);
			const indexB = note.indexOf(Note.dragged);
			if(indexA<indexB){
				this.parentElement.insertBefore(Note.dragged,this);
			}else{
				this.parentElement.insertBefore(Note.dragged,this.nextElementSibling);
			}
		}else{
			this.parentElement.insertBefore(Note.dragged,this);
		}
	}
}



