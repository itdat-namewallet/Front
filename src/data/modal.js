import React from "react";
import "../assets/css/auth/modal.css";

export default function Modal({ title, sections, isOpen, onClose, onAgree, isAgreed }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-body">
          {sections.map((section, index) => (
            <div key={index} className="modal-section">
              <h3>{section.title}</h3>
              {section.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <label>
            <input type="checkbox" checked={isAgreed} onChange={onAgree} />
            동의합니다
          </label>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
