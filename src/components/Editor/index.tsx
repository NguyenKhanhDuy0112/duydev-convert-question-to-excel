import ReactQuill from "react-quill"

interface EditorProps {
    value: string
    onChange: (value: string) => void
}

function Editor(props: EditorProps) {
    const { value, onChange } = props
    return <ReactQuill value={value} onChange={onChange} />
}

export default Editor
