import { Avatar, Button, Card, Divider } from "antd";
import Meta from "antd/es/card/Meta";

const SkeletonCard: React.FC = () => {
  return (
    <Card style={{ width: 240, marginTop: 16 }} loading={true}>
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
        }
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default SkeletonCard;
