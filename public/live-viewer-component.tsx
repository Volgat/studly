import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const LiveViewer = () => {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const videoRef = useRef();
  const socketRef = useRef();
  const peerConnectionRef = useRef();

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_SERVER);

    socketRef.current.emit('join-session', { sessionId, userId: user.id, isHost: false });

    socketRef.current.on('offer', async ({ offer }) => {
      peerConnectionRef.current = new RTCPeerConnection();
      
      peerConnectionRef.current.ontrack = (event) => {
        videoRef.current.srcObject = event.streams[0];
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit('ice-candidate', { candidate: event.candidate, sessionId });
        }
      };

      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socketRef.current.emit('answer', { answer, sessionId });
    });

    socketRef.current.on('ice-candidate', ({ candidate }) => {
      peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socketRef.current.disconnect();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [sessionId, user.id]);

  return (
    <div>
      <video ref={videoRef} autoPlay className="w-full"></video>
    </div>
  );
};

export default LiveViewer;
