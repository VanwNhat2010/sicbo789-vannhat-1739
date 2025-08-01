const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api-sicbo-789', async (req, res) => {
    try {
        const response = await axios.get('https://hknam-prediction-sicbo789.onrender.com/predict');
        const data = response.data;

        const restructuredData = {
            id: "Tele@CsTool001",
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

        res.json(restructuredData);
    } catch (error) {
        console.error('Lỗi khi gọi API gốc:', error);
        res.status(500).json({
            error: 'Không thể lấy dữ liệu từ API gốc.',
            details: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server của bạn đang chạy tại http://localhost:${port}`);
});
