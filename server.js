// server.js
const express = require('express');
const fetch = require('node-fetch'); // hoặc dùng axios nếu bạn quen

const app = express();
const PORT = process.env.PORT || 3000;
const ORIGINAL_API_URL = "https://hknam-prediction-sicbo789.onrender.com/predict";

app.get('/predict_sicbo789', async (req, res) => {
    try {
        // Gửi yêu cầu GET đến API gốc
        const response = await fetch(ORIGINAL_API_URL);
        
        // Kiểm tra xem phản hồi có thành công không
        if (!response.ok) {
            throw new Error(`API gốc trả về lỗi: ${response.statusText}`);
        }
        
        // Lấy dữ liệu JSON từ phản hồi
        const data = await response.json();
        
        // Thêm trường "id" vào dữ liệu
        data.id = "Tele@CsTool001";
        
        // Trả về dữ liệu đã được cập nhật dưới dạng JSON
        res.status(200).json(data);

    } catch (error) {
        console.error('Lỗi khi gọi API gốc:', error.message);
        res.status(500).json({
            error: "Có lỗi xảy ra khi lấy dữ liệu từ API gốc.",
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log(`Endpoint API của bạn là: http://localhost:${PORT}/predict_with_id`);
});
