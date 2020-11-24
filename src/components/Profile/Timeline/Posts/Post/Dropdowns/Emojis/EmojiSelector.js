
import React from 'react';
import Emoji from './Emoji'
import classes from './EmojiSelector.css'

const emojiSelector = (props) => {

    const sources = [
        {url: 'https://media.giphy.com/media/dalJ0CpF7hwmN1nZXe/giphy.gif', caption: 'Like', id:10},
        {url: 'https://media.giphy.com/media/TF11M0XrowTQWfAgUB/giphy.gif', caption: 'Love', id:7},
        {url: 'https://media.giphy.com/media/WprjTWyCWtfbJ11WEM/giphy.gif', caption: 'Omg', id:1},
        {url: 'https://media.giphy.com/media/ViHbdDMcIOeLeblrbq/giphy.gif', caption: 'Cry', id:2},
        {url: 'https://media.giphy.com/media/kyQfR7MlQQ9Gb8URKG/giphy.gif', caption: 'Mad', id:3},
        {url: 'https://media.giphy.com/media/h4OGa0npayrJX2NRPT/giphy.gif', caption: 'Sad', id:4},
        {url: 'https://media.giphy.com/media/hVlZnRT6QW1DeYj6We/giphy.gif', caption: 'Lmao', id:5},
        {url: 'https://media.giphy.com/media/hp3dmEypS0FaoyzWLR/giphy.gif', caption: 'No!', id:6},
        {url: 'https://media.giphy.com/media/jVIKa3erp2SqgmmrAK/giphy.gif', caption: 'Cool!', id:8},
    ]

    const emojis = sources.map(src => (
        <Emoji
            key={src.id}
            gif={src.url}
            caption={src.caption}
            clicked={props.handleReaction}
        />
    ))

    return (
        <div className={classes.EmojiSelectorContainer}>
            {emojis}
        </div>
    );
}

export default emojiSelector;