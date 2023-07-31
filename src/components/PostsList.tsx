import type { Post } from './Post'

import deleteImg from '/deleteImg.png'

interface PostsList{
  items : Post[];
  deleteItem : React.MouseEventHandler<HTMLElement>;
}

const PostsList = ( props : PostsList ) => {
  const list = props.items;
  const listView = list.map((item, key) => {
    return (
      <div className='post' key={key}>
        <div className='post-text'>{item.content}</div>
        <button className='post-delete'><img src={deleteImg} onClick={props.deleteItem} data-id={key} data-uid={item.id}/></button>
      </div>
    )
  });
  
  return(
    <div className='posts-list'>{listView}</div>
  )
}

export default PostsList