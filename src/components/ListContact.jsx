import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { DataContext } from '../store/context';
import {IoMdTrash} from 'react-icons/io'
import {IoArchiveSharp} from 'react-icons/io5'
import { List } from 'antd';
import {MdSettingsBackupRestore} from 'react-icons/md'

class ListContact extends Component {
  static contextType = DataContext;

  render() {
    const { items, removeItem, updateItem, restoreItem } = this.context;
    const archivedItems = items.filter(item => item.archived === true);


    const deleteNoted = (e, id) => {
      e.preventDefault();
      // Code untuk menghapus data dengan id yang diberikan
      removeItem(id)
    }

    const updateNoted = (e, id) => {
      e.preventDefault();

      updateItem(id);
    }

    const restoreNoted = (e, id) => {
      e.preventDefault();

      restoreItem(id);
    }

    return (
      <div>
        <Row gutter={[24, 24]} style={{ alignItems: 'stretch' }}>
          {items.map((data, i) => {
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={data.id}>
                {!data.archived && (
                    <Card title={data.title} bordered style={{ height: '100%' }}>
                    <div style={{ height: '100px' }}>
                      {data.body}
                    </div>
                    <div className='flex justify-between mt-8  items-center'>
                      <div className=''>{data.createdAt}</div>
                      <div className='flex space-x-2 items-center'>
                        <IoArchiveSharp size={16} className='text-gray-500 cursor-pointer' onClick={(e) => updateNoted(e, data.id)}></IoArchiveSharp>
                        <IoMdTrash size={18} className="text-red-500 cursor-pointer" onClick={(e) => deleteNoted(e, data.id)}></IoMdTrash>
                      </div>
                    </div>
                  </Card>
                ) }
              </Col>
            );
          })}
        </Row>
        <div className='mt-10'>
          <div className='flex space-x-2 items-center'>
          <IoArchiveSharp size={24} className='text-gray-500 cursor-pointer'></IoArchiveSharp>
            <div className='text-gray-500 font-semibold'>Archived</div>
          </div>
          <div className='mt-8'>
          <List
              size="large"
              bordered
              dataSource={archivedItems}
              renderItem={(item) =>
                <List.Item>
                    <div>{item.title}</div>
                    <MdSettingsBackupRestore size={16} className='text-gray-500 cursor-pointer' onClick={(e) => restoreNoted(e, item.id)}></MdSettingsBackupRestore>
                </List.Item>
            }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListContact;
