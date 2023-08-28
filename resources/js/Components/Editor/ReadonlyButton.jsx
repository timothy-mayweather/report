export default function ReadonlyButton({readonly, onClick}){
    return (
        <>
            <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={onClick}>
                <span className="hover:text-gray-700">{readonly?"Edit":"Readonly"}</span>
            </button>
        </>
    );
}
