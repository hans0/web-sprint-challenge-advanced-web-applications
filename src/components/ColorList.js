import React, { useState } from "react";
import axios from "axios";

import Color from './Color';
import EditMenu from './EditMenu';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        // console.log(res);
        updateColors(
          colors.map(color => {
            if (color.id !== res.data.id){
              return color;
            } else {
              return res.data;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })

  };

  const deleteColor = color => {
    // console.log('Deleting color:', color);
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        // console.log(res);
        updateColors(
          colors.filter(c => c.id != res.data)
        );
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.