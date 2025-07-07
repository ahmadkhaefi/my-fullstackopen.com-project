const Note = ({note}) => {
    return <li>[{note.important ? 'X' : ''}]{note.content}</li>
}

export default Note
