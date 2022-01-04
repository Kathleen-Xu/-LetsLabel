import React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

import useStyles from "./styles";
import PropTypes from "prop-types";


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineImageList(props) {
  const classes = useStyles();
  const itemData = props.imgList;
  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2.5}>
        {itemData.map((item, index) => (
          <ImageListItem key={index} className={classes.image}>
            <img src={item.Url} alt={item.Name} className={classes.svg}/>
            <ImageListItemBar
              title={item.Name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
SingleLineImageList.propTypes = {
  imgList: PropTypes.array,
};