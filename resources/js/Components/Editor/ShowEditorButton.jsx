export default function ShowEditorButton({showTools, onClick}){
    return (
        <>
            <button className="inline-flex items-center px-3 py-2 border border-transparent" type="button" onClick={onClick}>
                <span className="hover:text-gray-700">editor tools
                    <span >
                        <svg style={showTools?{transform: 'rotate(180deg)'}:{}}
                             className="ml-2 -mr-0.5 h-4 w-4 inline-flex"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"
                             fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </span>
            </button>
        </>
    );
}
