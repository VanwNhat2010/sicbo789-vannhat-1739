const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Sử dụng CORS để cho phép các domain khác có thể gọi đến API này
app.use(cors());

// Định nghĩa endpoint API mới của bạn
app.get('/predict-sicbo', async (req, res) => {
    try {
        // Gọi đến API gốc
        const response = await axios.get('https://hknam-prediction-sicbo789.onrender.com/predict');
        const data = response.data;

        // Sắp xếp lại dữ liệu theo cấu trúc bạn yêu cầu
        const restructuredData = {
            Phien_hien_tai: data.phien,
            Du_doan: data.du_doan,
            Doan_vi: data.doan_vi,
            Thuc_te: {
                Xuc_xac: data.thuc_te.xuc_xac,
                Ket_qua: data.thuc_te.ket_qua,
                Vi_xuc_xac: data.thuc_te.vi
            },
            Ket_qua_truoc: {
                Tai_xiu: data.ket_qua_truoc.tai_xiu,
                Vi_trung: data.ket_qua_truoc.vi
            },
            du_doan_moi: {
                Phien: data.du_doan_tiep_theo.phien,
                Du_doan: data.du_doan_tiep_theo.du_doan,
                Doan_vi: data.du_doan_tiep_theo.doan_vi
            }
        };

        // Trả về dữ liệu đã được định dạng lại dưới dạng JSON
        res.json(restructuredData);
    } catch (error) {
        // Xử lý lỗi nếu không thể kết nối hoặc có lỗi từ API gốc
        console.error('Lỗi khi gọi API gốc:', error.message);
        res.status(500).json({
            error: 'Không thể lấy dữ liệu từ API gốc.',
            details: error.message
        });
    }
});

// Chạy server trên cổng đã được chỉ định
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
