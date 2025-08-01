const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const ORIGINAL_API_URL = "https://hknam-prediction-sicbo789.onrender.com/predict";

// Endpoint API mới của bạn
app.get('/predict_with_id', async (req, res) => {
    try {
        // Gọi API gốc
        const response = await fetch(ORIGINAL_API_URL);
        
        // Xử lý lỗi nếu API gốc không phản hồi thành công
        if (!response.ok) {
            throw new Error(`API gốc trả về lỗi: ${response.status} ${response.statusText}`);
        }
        
        // Chuyển đổi dữ liệu nhận được sang JSON
        const data = await response.json();
        
        // Thêm trường "id" vào dữ liệu
        data.id = "Tele@CsTool001";
        
        // Trả về dữ liệu đã được cập nhật
        res.status(200).json(data);

    } catch (error) {
        // Ghi lại lỗi và trả về phản hồi lỗi
        console.error('Lỗi khi gọi API gốc:', error.message);
        res.status(500).json({
            error: "Có lỗi xảy ra khi lấy dữ liệu từ API gốc.",
            details: error.message
        });
    }
});

// Chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log(`Bạn có thể truy cập API tại: http://localhost:${PORT}/predict_with_id`);
});
