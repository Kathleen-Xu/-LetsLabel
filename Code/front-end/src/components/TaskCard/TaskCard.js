import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import SpellcheckRoundedIcon from '@material-ui/icons/SpellcheckRounded';
import Button from '@material-ui/core/Button';
import useStyles from "./styles";
import PropTypes from "prop-types";

import SingleLineImageList from "../ImageList/ImageList";
import {Divider} from "@material-ui/core";

export default function TaskCard(props) {
  const classes = useStyles();
  const info = props.info;
  const self = props.check;
  function toLabel() {
    props.labelFuc();
  }
  function toExport() {
    props.exprotFuc(info.UID);
  }
  function toCheck() {
    props.checkFuc(info.UID);
  }
  return (
    <Card variant="outlined" className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.columnEdge}>
            {info.IsSubmitted && (
              <div className={classes.icon}>
                {info.IsPassed === "good" && <CheckCircleOutlineIcon />}
                {info.IsPassed === "bad" && <HighlightOffRoundedIcon />}
                {info.IsPassed === "pending" && <SpellcheckRoundedIcon />}
              </div>
            )}
          </div>
          <div className={classes.realSummary}>
            <div className={classes.row}>
              <div className={classes.column}>
                <Typography className={classes.heading}>任务名：{info.Name}</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>发布人：{info.Owner}</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>发布时间：{info.PostTime}</Typography>
              </div>
              <div className={classes.columnEdge}>
                {!info.IsSubmitted &&
                  <Button
                    onClick={toLabel}
                    variant="outlined">
                    标注
                  </Button>}
                { info.IsSubmitted && self
                  && info.IsPassed === "pending"
                  &&
                    <Button
                      onClick={toCheck}
                      variant="outlined"
                    >
                      复核
                    </Button>
                }
              </div>
            </div>
            {info.IsSubmitted && (
              <Divider
                variant="middle"
                orientation="horizontal"
                className={classes.divider}
              />
            )}
            {info.IsSubmitted && (
              <div className={classes.row}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>已提交</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>提交人：{info.Submitter}</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    复核结果：
                    {info.IsPassed === "good" && "复核通过"}
                    {info.IsPassed === "bad" && "复核不通过"}
                    {info.IsPassed === "pending" && "暂未复核"}
                  </Typography>
                </div>
                <div className={classes.columnEdge}>
                  <Button
                    onClick={toExport}
                    variant="outlined"
                  >
                    导出
                  </Button>
                </div>
              </div>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <SingleLineImageList imgList={info.Img} />
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

TaskCard.propTypes = {
  info: PropTypes.object,
  labelFuc: PropTypes.func,
  exportFuc: PropTypes.func,
  check: PropTypes.bool,
  checkFuc: PropTypes.func,
};