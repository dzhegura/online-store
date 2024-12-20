import React, { useState } from 'react';
import './PaymentModal.css';

function PaymentModal({ onClose, clearCart }) {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        const cardNumberRegex = /^\d{16}$/;
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3}$/;

        if (!cardNumberRegex.test(formData.cardNumber)) {
            newErrors.cardNumber = 'Неверный номер карты';
        }
        if (!expiryDateRegex.test(formData.expiryDate)) {
            newErrors.expiryDate = 'Неверный срок действия';
        }
        if (!cvvRegex.test(formData.cvv)) {
            newErrors.cvv = 'Неверный CVV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSuccessMessage('Ваш заказ оформлен!');
            clearCart();
        }
    };

    return (
        <div className="payment-modal-overlay">
            <div className="payment-modal">
                <h2>Оплата</h2>
                {successMessage ? (
                    <div>
                        <p className="success-message">{successMessage}</p>
                        <button className="payment-button close-button" onClick={onClose}>Закрыть</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Номер карты:</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                maxLength="16"
                            />
                            {errors.cardNumber && (
                                <p className="error">{errors.cardNumber}</p>
                            )}
                        </div>
                        <div>
                            <label>Срок действия (MM/YY):</label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                placeholder="ММ/ГГ"
                            />
                            {errors.expiryDate && (
                                <p className="error">{errors.expiryDate}</p>
                            )}
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input
                                type="password"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                maxLength="3"
                            />
                            {errors.cvv && <p className="error">{errors.cvv}</p>}
                        </div>
                        <button type="submit" className="payment-button">Купить</button>
                        <button type="button" className="payment-button" onClick={onClose}>Отмена</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default PaymentModal;