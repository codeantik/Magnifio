import React, {useState} from 'react';
// import './mainChat.css';
import './mainChatDark.css';
import ChatTemplate from '../ChatTemplate/ChatTemplate';
import AllChat from '../AllChat/AllChat';

const MainChat = () => {

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        console.log(category)
    }

    return (
        <div className="mainChatContainer">
            <div className="mainChatCategories">
                <button onClick={() => handleCategoryChange('all')}>All</button>
                <button onClick={() => handleCategoryChange('email')}>Email</button>
                <button onClick={() => handleCategoryChange('discord')}>Discord</button>
                <button onClick={() => handleCategoryChange('jira')}>Jira</button>
                <button onClick={() => handleCategoryChange('telegram')}>Telegram</button>
            </div>
            <div className="mainChatResult">
                {(selectedCategory === 'all') ? 
                    <AllChat selectedCategory={selectedCategory} /> : 
                    <ChatTemplate selectedCategory={selectedCategory} />
                }
            </div>
        </div>
    );
}

export default MainChat;