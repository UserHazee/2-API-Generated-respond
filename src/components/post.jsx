export default function Post({ username, imageUrl, caption }) {
    return (
      <div className="bg-white rounded-lg shadow-md mb-4 p-4">
        <h3 className="font-bold mb-2">@{username}</h3>
        <img src={imageUrl} alt="Post" className="w-full rounded mb-2" />
        <p>{caption}</p>
      </div>
    );
  }
  