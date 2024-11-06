
import PropTypes from 'prop-types'; 

const Tag = ({ text, onRemove }) => {
    return (
        <div className="flex items-center bg-pink-500 text-white px-3 py-1 rounded-full mr-2">
            {text}
            <button 
                onClick={onRemove} 
                className="ml-2 text-white hover:text-red-300"
            >
                &times;
            </button>
        </div>
    );
};

Tag.propTypes = {
    text: PropTypes.node.isRequired,
    onRemove: PropTypes.func.isRequired, 
};

export default Tag;
