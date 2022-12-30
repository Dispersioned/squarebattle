import { Menu } from 'pages/menu';
import { Play } from 'pages/play';
import { Navigate, Route, Routes } from 'react-router-dom';

export function AppRouter() {
  return (
    <Routes>
      <Route path="menu" element={<Menu />} />
      <Route path="play" element={<Play />} />
      <Route path="*" element={<Navigate to="menu" />} />
    </Routes>
  );
}
