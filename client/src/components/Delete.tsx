type props = {
    handleDelete: () => void;
};

export default function Delete({ handleDelete }: props) {
    return (
        <button
            id="deleteButton"
            data-modal-target="deleteModal"
            data-modal-toggle="deleteModal"
            className="block material-symbols-outlined text-red-600"
            type="button"
            onClick={() => {
                if (
                    window.confirm("Are you sure you wish to delete this item?")
                )
                    handleDelete();
            }}
        >
            Delete
        </button>
    );
}
