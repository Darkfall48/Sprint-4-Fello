export function TaskChecklistModal({board, onCloseModal}){
    return <div>
        <p>Title</p>
        <input type="text" placeholder="Checklist"/>
        <p>Copy items from...</p>
        <select name="copy-items-from" className="copy-items-from">
            <option value="none">(none)</option>
        </select>
    </div>
}