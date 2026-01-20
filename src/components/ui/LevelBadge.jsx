import { motion } from 'framer-motion';

function LevelBadge({ level }) {
  const levelConfig = {
    beginner: {
      label: 'Beginner',
      icon: '🌱',
      gradient: 'from-green-500 to-emerald-500',
    },
    intermediate: {
      label: 'Intermediate',
      icon: '🌿',
      gradient: 'from-blue-500 to-cyan-500',
    },
    advanced: {
      label: 'Advanced',
      icon: '🌳',
      gradient: 'from-purple-500 to-pink-500',
    },
  };

  const config = levelConfig[level] || levelConfig.beginner;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-md`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </motion.span>
  );
}

export default LevelBadge;
