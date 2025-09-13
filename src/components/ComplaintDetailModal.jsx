import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { faClose, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Send } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/Firebase";
import {
  addComment,
  isOfficial,
  markAsRejected,
  markAsSolved,
} from "../utils/FirebaseFunctions";
import { Statuses, statusColors } from "../utils/enums";
import CommentsTile from "./CommentsTile";

const ComplaintDetailModal = ({ setDialogOpen, complaint }) => {
  const [Official, setOfficial] = useState(false);
  const [CommentBoxDisabled, setCommentBoxDisabled] = useState(true);
  const [CommentFValue, setCommentFValue] = useState("");

  // Check if current user is official
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const officialOrNot = await isOfficial(user.uid);
        setOfficial(officialOrNot);
      } else {
        setOfficial(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Disable comment box if complaint not in progress
  useEffect(() => {
    setCommentBoxDisabled(complaint.status !== Statuses.inProgress);
  }, [complaint.status]);

  // Format timestamp
  const TimeStamp = new Date(complaint.timestamp);
  const date = TimeStamp.toLocaleDateString();
  const time = TimeStamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Determine status color
  const StatusColorEnum = Object.keys(Statuses).find(
    (key) => Statuses[key] === complaint.status
  );

  return (
    <div>
      <DialogTitle className="flex justify-between">
        Complaint Details
        <DialogActions>
          <FontAwesomeIcon
            onClick={() => setDialogOpen(false)}
            className="cursor-pointer"
            icon={faClose}
          />
        </DialogActions>
      </DialogTitle>

      <DialogContent>
        {/* Location & Status */}
        <div className="flex justify-between mb-2">
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p>{complaint.location?.name || "Unknown Location"}</p>
          </div>
          <span
            className="w-30 text-center rounded-xl font-bold flex items-center text-white h-12 lg:h-6 px-4"
            style={{
              backgroundColor: statusColors[StatusColorEnum] || "gray",
            }}
          >
            {complaint.status}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex gap-3 items-center mb-4">
          <FontAwesomeIcon icon={faClockFour} />
          <p>{`${date} , ${time}`}</p>
        </div>

        {/* Reason & Additional Info */}
        <h2 className="text-lg font-bold my-2">{complaint.reason}</h2>
        {complaint.additionalInfo && <p>{complaint.additionalInfo}</p>}

        {/* Media */}
        {complaint.mediaPath && (
          <>
            {complaint.mediaType === "image" ? (
              <img
                className="max-w-full w-auto h-96 object-scale-down my-4"
                src={complaint.mediaPath}
                alt="Complaint Media"
              />
            ) : (
              <video
                controls
                className="max-w-full w-auto h-96 object-scale-down my-4"
                src={complaint.mediaPath}
              />
            )}
          </>
        )}

        {/* Comments Section */}
        <h2 className="text-lg font-bold my-4">Comments</h2>
        <div>
          {complaint.comments && complaint.comments.length === 0 ? (
            <p className="text-center text-gray-500">No Comments</p>
          ) : (
            complaint.comments.map((comment) => (
              <CommentsTile key={comment.id} comment={comment} />
            ))
          )}
        </div>

        {/* Add Comment */}
        {complaint.status === Statuses.inProgress && Official && (
          <div className="my-4 flex gap-4 items-center">
            <TextField
              fullWidth
              value={CommentFValue}
              onChange={(e) => {
                setCommentFValue(e.target.value);
                setCommentBoxDisabled(e.target.value.trim() === "");
              }}
              variant="outlined"
              label="Add your comment"
            />
            <IconButton
              className="h-10 w-10 shadow-xl border rounded-full flex items-center justify-center"
              onClick={async () => {
                await addComment(complaint.id, CommentFValue);
                setCommentFValue("");
                setCommentBoxDisabled(true);
              }}
              disabled={CommentBoxDisabled}
            >
              <Send />
            </IconButton>
          </div>
        )}
      </DialogContent>

      {/* Actions */}
      {Official && complaint.status === Statuses.inProgress && (
        <DialogActions className="justify-end gap-4">
          <Button
            color="error"
            variant="outlined"
            onClick={async () => {
              await markAsRejected(complaint.id);
              setDialogOpen(false);
            }}
          >
            Mark as Rejected
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={async () => {
              await markAsSolved(complaint.id);
              setDialogOpen(false);
            }}
          >
            Mark as Solved
          </Button>
        </DialogActions>
      )}
    </div>
  );
};

export default ComplaintDetailModal;
