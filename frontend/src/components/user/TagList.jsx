import Tag from './common/Tag';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const TagList = ({ onTagsChange, currentTags = [] }) => {
    const [tags, setTags] = useState(currentTags);
    const [inputValue, setInputValue] = useState('');

    // Đồng bộ hóa tags với currentTags khi currentTags thay đổi
    useEffect(() => {
        setTags(currentTags);
    }, [currentTags]);

    useEffect(() => {
        onTagsChange(tags);
    }, [tags, onTagsChange]);

    const handleAddTag = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center mb-4">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Thêm kỹ năng..."
                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-pink-500"
                />
                <button 
                    onClick={handleAddTag} 
                    className="ml-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                >
                    Thêm
                </button>
            </div>
            <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                    <Tag key={index} text={tag} onRemove={() => handleRemoveTag(tag)} />
                ))}
            </div>
        </div>
    );
};

TagList.propTypes = {
    onTagsChange: PropTypes.func.isRequired, 
    currentTags: PropTypes.array, 
};

export default TagList;
