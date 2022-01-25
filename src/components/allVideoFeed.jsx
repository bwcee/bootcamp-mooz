const allVideoFeed = ({ users }) => {
  return (
    <>
      {users.map((user) => {
        <User key={user.id} user={user} />;
      })}
    </>
  );
};

export default allVideoFeed;
