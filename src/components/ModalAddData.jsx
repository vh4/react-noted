import { Modal } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import React, { Component } from 'react';
import { DataContext } from '../store/context';
import createdAt from '../utils/date';
import { Form, Input } from 'antd';
import { notification } from 'antd';

class ModalAddData extends Component {
	static contextType = DataContext;

	constructor(props) {
		super(props);

		this.formRef = React.createRef();
		this.api = notification;

		this.state = {
			visible: false,
			confirmLoading: false,
		};
	}

	openNotification = () => {
		this.api.success({
		  message: 'Adding Data',
		  description:
			'Successfully Added the data!.',
		});
	  };

	showModal = () => {
		this.setState({
			visible: true,
		});
	};

	handleOk = () => {
		if (this.formRef.current) {
			this.formRef.current.submit();
		}
	};

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	};

	handleFormSubmit = (values) => {
		this.setState({
			confirmLoading: true,
		});

		const { addItem } = this.context;
		const params = {
			id: Date.now().toString(16),
			...values,
			archived: false,
			createdAt: createdAt(),
		};
		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false,
			});
			addItem(params);
			this.formRef.current.resetFields(); // clear form
			this.openNotification()
		}, 1000);
	};

	render() {
		const { visible, confirmLoading } = this.state;

		return (
			<>
			<div className='flex space-x-2 items-center'>
				<PlusCircleFilled className='text-gray-500' style={{ fontSize: '24px' }} onClick={this.showModal} />
				<div className='text-gray-500 font-semibold'>Tambah Data</div>
			</div>
				<Modal
					title="Tambah catatan"
					visible={visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					confirmLoading={confirmLoading}
					okButtonProps={{ style: { background: "#60a5fa" } }} // Menambahkan properti style pada button OK
				>
					<Form onFinish={this.handleFormSubmit} ref={this.formRef}> {/* Mengubah handleFormSubmit pada onFinish */}
						<Form.Item
							label="Judul Catatan"
							name="title"
							rules={[
								{ required: true, message: "Input title harus diisi" },
								{ min: 4, message: "Input title harus min 4 karakter" },
							]}
							labelAlign="top"
							labelCol={{ span: 24 }}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Body catatan"
							name="body"
							rules={[
								{ required: true, message: "Input body harus diisi" },
								{ min: 10, message: "Input body harus min 10 karakter" },
							]}
							labelAlign="top"
							labelCol={{ span: 24 }}
							colon={false}
						>
							<Input.TextArea style={{ height: "100px" }} />
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
}

export default ModalAddData;
