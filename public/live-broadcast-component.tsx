import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const LiveBroadcast = () => {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const videoRef = useRef();
  const socketRef = useRef();
  const peerConnectionsRef = useRef({});
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_SERVER);

    socketRef.current.emit('join-session', { sessionId, userId: user.id, isHost: true });

    socketRef.current.on('viewer-connected', ({ viewerId }) => {
      const peerConnection = new RTCPeerConnection();
      peerConnectionsRef.current[viewerId] = peerConnection;

      videoRef.current.srcObject.getTracks().forEach(track => {
        peerConnection.addTrack(track, videoRef.current.srcObject);
      });

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit('ice-candidate', { candidate: event.candidate, viewerId });
        }
      };

      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
          socketRef.current.emit('offer', { offer: peerConnection.localDescription, viewerId });
        });
    });

    socketRef.current.on('answer', ({ answer, viewerId }) => {
      peerConnectionsRef.current[viewerId].setRemoteDescription(new RTCSessionDescription(answer));
    });

    socketRef.current.on('ice-candidate', ({ candidate, viewerId }) => {
      peerConnectionsRef.current[viewerId].addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socketRef.current.disconnect();
      Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
    };
  }, [sessionId, user.id]);

  const startBroadcast = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      setIsLive(true);
      socketRef.current.emit('start-broadcast', { sessionId });
    } catch (error) {
      console.error('Erreur lors du démarrage de la diffusion:', error);
    }
  };

  const stopBroadcast = () => {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setIsLive(false);
    socketRef.current.emit('stop-broadcast', { sessionId });
  };

  return (
    <div className="space-y-4">
      <video ref={videoRef} autoPlay muted className="w-full"></video>
      {!isLive ? (
        <button onClick={startBroadcast} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Commencer la diffusion
        </button>
      ) : (
        <button onClick={stopBroadcast} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Arrêter la diffusion
        </button>
      )}
    </div>
  );
};

export default LiveBroadcast;
