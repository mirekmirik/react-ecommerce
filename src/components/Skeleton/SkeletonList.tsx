import SkeletonCard from "./SkeletonCard";

interface SkeletonListProps {
  countItems?: number;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ countItems = 5 }) => {
  return Array.from({ length: countItems }, (_, index) => (
    <SkeletonCard key={index} />
  ));
};

export default SkeletonList;
