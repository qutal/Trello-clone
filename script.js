let columnIdCounter=4;





document.querySelectorAll('.column').forEach(columnProccess);

document.querySelector('[data-action-addcolumn]').addEventListener('click',function(event){
	const columnElement = document.createElement('div');
	columnElement.classList.add('column');
	columnElement.setAttribute('draggable','true');
	columnElement.setAttribute('data-column-id',columnIdCounter);
	columnIdCounter++;
	columnElement.innerHTML = `<p class="column-header">В плане</p>
								<div data-notes></div>
								<p class="column-footer">
								<span data-action-addNote class="action">+ Добавить карточку</span>
								</p>`;
	document.querySelector('.columns').append(columnElement);
	columnProccess(columnElement);




});

document.querySelectorAll('.column-header').forEach(headerProccess);

document.querySelectorAll('.note').forEach(Note.proccess);

function columnProccess(columnElement){
		const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');
		spanAction_addNote.addEventListener('click',function(event){

		const noteElement = document.createElement('div');
		noteElement.classList.add('note');
		noteElement.setAttribute('draggable','true');
		noteElement.setAttribute('data-note-id',Note.idCounter);
		noteElement.innerHTML = '';
		Note.idCounter++;

		columnElement.querySelector('[data-notes]').append(noteElement);
		Note.proccess(noteElement);

		noteElement.setAttribute('contenteditable',true);
		noteElement.focus();
	});
	const headerElement = columnElement.querySelector('.column-header');
	headerProccess(headerElement);

	columnElement.addEventListener('dragover',function(event){
		event.preventDefault();
	})

	columnElement.addEventListener('drop',function(event){
		if(Note.dragged){
			return columnElement.querySelector('[data-notes]').append(Note.dragged);
		}
	})


		
}

function headerProccess(headerElement){

		headerElement.addEventListener('dblclick',function(event){
			headerElement.setAttribute('contenteditable','true');
			headerElement.focus();
		});

		headerElement.addEventListener('blur',function(event){
			headerElement.setAttribute('contenteditable','false');
		});
}

