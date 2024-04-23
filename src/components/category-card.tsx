import React from "react";
import Image from "next/image";
import { Card, CardContent, Typography } from "@mui/material";
import { Category } from "../../type";

interface CategoryCardProps {
  category: {

    imagepath: string;
    category_name: string;
    description: string;
    // icon: React.ElementType;
  }
}

function CategoryCard({category} : CategoryCardProps) {
  return (
    <Card style={{borderRadius: "1.5rem"}} className="relative grid min-h-[12rem] w-full overflow-hidden rounded-3xl">
      <Image
        width={768}
        height={768}
        src={category?.imagepath}
        alt={category.category_name}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 h-full w-full bg-black/50" />
      <CardContent className="relative flex flex-col justify-between">
        <div className="h-8 w-8"/>

        <div>
          <Typography variant="h5" className="mb-1" color="white">
            {category.category_name}
          </Typography>
          <Typography color="white" className="text-xs font-bold opacity-70">
            {category.description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
export default CategoryCard;
