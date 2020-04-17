import '@servicenow/now-button';
import '@servicenow/now-alert';
import '../todo-list-item';
import '../todo-list-modal';
import {
	ENTER_KEY_CODE,
	CREATE_TODO,
	MESSAGE_HIDE_COMPLETED_TO_DOS,
	MESSAGE_SHOW_COMPLETED_TO_DOS,
	TO_DO_LIST,
	ADD_A_TO_DO
} from '../constants';

export default (state, {dispatch, updateState}) => {
	const {
		properties: {activeToDos, completedToDos},
		todoInputValue,
		showingCompletedItems,
		showProgress,
		progressMessage,
		todoList,
		modal,
		alert
	} = state;

	const handlerToDoInputBtn = () => !!todoInputValue && dispatch(CREATE_TODO);

	const handlerToDoInputKeyPress = ({target: {value}, keyCode}) => {
		if (keyCode === ENTER_KEY_CODE && !!value.trim()) dispatch(CREATE_TODO);
	};

	const handlerToDoInput = ({target: {value}}) =>
		updateState({todoInputValue: value});

	const renderActiveToDos = () => (
		<div className="now-todo-list active-todos">
			{activeToDos.map(todo => (
				<now-sample-todo-list-item
					key={todo.sys_id}
					itemLabel={todo.short_description}
					itemId={todo.sys_id}
					itemCompleted={false}
				></now-sample-todo-list-item>
			))}
		</div>
	);

	const renderCompletedToDos = () => {
		const toggleCompletedToDosBtnLabel = showingCompletedItems
			? MESSAGE_HIDE_COMPLETED_TO_DOS
			: MESSAGE_SHOW_COMPLETED_TO_DOS;
		const toggleCompletedToDos = () =>
			updateState({showingCompletedItems: !showingCompletedItems});

		return (
			<div className="now-todo-list-toggle-completed-items-wrapper">
				<now-button
					label={toggleCompletedToDosBtnLabel}
					size="md"
					variant="primary"
					on-click={toggleCompletedToDos}
				></now-button>
				{showingCompletedItems ? (
					<div className="now-todo-list completed-todos">
						{completedToDos.map(todo => (
							<now-sample-todo-list-item
								key={todo.sys_id}
								itemLabel={todo.short_description}
								itemId={todo.sys_id}
								itemCompleted={true}
							></now-sample-todo-list-item>
						))}
					</div>
				) : null}
			</div>
		);
	};

	const renderToDoList = () => (
		<div className="todo-list-wrapper">
			{activeToDos.length ? renderActiveToDos() : null}
			{completedToDos.length ? renderCompletedToDos() : null}
		</div>
	);

	const renderProgressMessage = () => (
		<div className="now-todo-list-overlay">
			<span className="now-todo-list-message">{progressMessage}</span>
		</div>
	);

	const renderModal = () => (
		<sn-modal
			item-id={modal.id}
			modal-header={modal.header}
			modal-body={modal.body}
			success-event={modal.successEvent}
			cancel-event={modal.cancelEvent}
		></sn-modal>
	);

	const renderAlert = () => (
		<div className="now-todo-list-alert-container">
			<now-alert
				content={alert.content}
				status={alert.type}
				action={{type: 'dismiss'}}
			></now-alert>
		</div>
	);

	return (
		<main className="now-todo-list-container">
			<header>
				<p className="now-todo-list-container-title">{TO_DO_LIST}</p>
			</header>
			<div className="now-todo-list-input-wrapper">
				<input
					className="now-todo-list-input"
					placeholder={ADD_A_TO_DO}
					value={todoInputValue}
					on-input={handlerToDoInput}
					on-keypress={handlerToDoInputKeyPress}
				/>
				<now-button
					label="Add"
					size="md"
					variant="primary"
					disabled={!todoInputValue}
					on-click={handlerToDoInputBtn}
				></now-button>
			</div>

			{alert ? renderAlert() : null}
			{todoList.length ? renderToDoList() : null}
			{showProgress ? renderProgressMessage() : null}
			{modal ? renderModal() : null}
		</main>
	);
};
