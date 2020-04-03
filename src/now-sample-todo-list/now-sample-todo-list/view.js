import '@servicenow/now-button';
import '@servicenow/now-alert';
import '../now-sample-todo-list-item';
import '../modal';
import {
	ENTER_KEY_CODE,
	CREATE_TODO,
	MESSAGE_HIDE_COMPLETED_TO_DOS,
	MESSAGE_SHOW_COMPLETED_TO_DOS
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
		if (keyCode === ENTER_KEY_CODE && !!value.trim()) {
			dispatch(CREATE_TODO);
		}
	};

	const handlerToDoInput = ({target: {value}}) =>
		updateState({todoInputValue: value});

	const renderActiveToDos = () => {
		if (activeToDos.length === 0) return;

		return (
			<div className="todo-list active-todos">
				{activeToDos.map(todo => (
					<now-sample-todo-list-item
						key={todo.sys_id}
						itemLabel={todo.short_description}
						itemId={todo.sys_id}
						itemCompleted={false}
					/>
				))}
			</div>
		);
	};

	const renderToDoList = () => {
		if (todoList.length === 0) return;

		return (
			<div className="todo-list-wrapper">
				{renderActiveToDos()}
				{renderCompletedToDos()}
			</div>
		);
	};

	const renderCompletedToDos = () => {
		if (completedToDos.length === 0) return;

		const toggleCompletedToDosBtnLabel = showingCompletedItems
			? MESSAGE_HIDE_COMPLETED_TO_DOS
			: MESSAGE_SHOW_COMPLETED_TO_DOS;
		const toggleCompletedToDos = () =>
			updateState({showingCompletedItems: !showingCompletedItems});

		return (
			<div className="toggle-completed-items-wrapper">
				<now-button
					label={toggleCompletedToDosBtnLabel}
					size="md"
					variant="primary"
					on-click={toggleCompletedToDos}
				/>
				{showingCompletedItems ? (
					<div className="todo-list completed-todos">
						{completedToDos.map(todo => (
							<now-sample-todo-list-item
								key={todo.sys_id}
								itemLabel={todo.short_description}
								itemId={todo.sys_id}
								itemCompleted={true}
							/>
						))}
					</div>
				) : null}
			</div>
		);
	};

	const renderFooterSection = () => {
		return (
			<div className="footer">
				{renderProgressMessage()}
				{renderModal()}
			</div>
		);
	};

	const renderProgressMessage = () => {
		if (!showProgress) return;

		return (
			<div className="overlay">
				<span className="message">{progressMessage}</span>
			</div>
		);
	};

	const renderModal = () => {
		if (!modal) return;
		return (
			<sn-modal
				item-id={modal.id}
				modal-header={modal.header}
				modal-body={modal.body}
				success-event={modal.successEvent}
				cancel-event={modal.cancelEvent}
			/>
		);
	};

	const renderAlert = () => {
		if (!alert) return;
		return (
			<div className="alert-container">
				<now-alert
					content={alert.content}
					status={alert.type}
					action={{type: 'dismiss'}}
				/>
			</div>
		);
	};

	return (
		<main className="todo-list-container">
			<header>
				<p className="todo-container-title">To-Do List</p>
			</header>
			<div className="todo-input-wrapper">
				<input
					className="todo-input"
					placeholder="Add a to-do..."
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
				/>
			</div>

			{renderAlert()}
			{renderToDoList()}
			{renderFooterSection()}
		</main>
	);
};
