import Post from '../components/post';

export default function Home() {
    return (
        <div className="p-4 max-w-md mx-auto">
        <Post
          username="husband_001"
          imageUrl="https://via.placeholder.com/400"
          caption="Cooked dinner again. Rate it!"
        />
        <Post
          username="husband_002"
          imageUrl="https://via.placeholder.com/400"
          caption="Surprised her with flowers 💐"
        />
      </div>
    );
  }