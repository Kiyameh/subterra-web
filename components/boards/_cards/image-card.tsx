import React from "react";

interface ImageCardProps {
  src?: string;
  alt?: string;
}
export default function ImageCard({}: ImageCardProps) {
  return (
    <div className="flex min-h-96 w-full flex-col items-center justify-center rounded-lg bg-card">
      <div>ImageCard</div>
      <p>Funcionalidad en desarrollo</p>
    </div>
  );
}
