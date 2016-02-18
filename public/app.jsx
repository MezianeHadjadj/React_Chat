var ChatList = React.createClass({
	render: function () {
		var Chats = (<div>Loading chats...</div>);
		if (this.props.chats) {
			Chats = this.props.chats.map(function (chat) {
				return (<Chat chat={chat} />);
			});
		}
		return (
			<div className="chatList">
				{Chats}
			</div>
		);
	}
});
var Chat = React.createClass({
	render: function () {
		return (
			<div className="chat">
				<span className="author">{this.props.chat.author}</span> :<br/>
				<div className="body">{this.props.chat.text}</div>
			</div>
		);
	}
});

var ChatForm = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var that = this;
		var author = this.refs.author.getDOMNode().value;
		var text = this.refs.text.getDOMNode().value;
		var chat = { author: author, text: text };
		var submitButton = this.refs.submitButton.getDOMNode();
		submitButton.innerHTML = 'Posting chat...';
		submitButton.setAttribute('disabled', 'disabled');
		this.props.submitChat(chat, function (err) {
			that.refs.author.getDOMNode().value = '';
			that.refs.text.getDOMNode().value = '';
			submitButton.innerHTML = 'Post chat';
			submitButton.removeAttribute('disabled');
		});
	},
	render: function () {
		return (
			<form className="chatForm" onSubmit={this.handleSubmit}>
				<input type="text" name="author" ref="author" placeholder="Name" required />
				<textarea name="text" ref="text" placeholder="Chat" required></textarea><br/>
				<button type="submit" ref="submitButton">Send</button>
			</form>
		);
	}
});


React.render(
	<ChatBox/>,
	document.getElementById('content')
);