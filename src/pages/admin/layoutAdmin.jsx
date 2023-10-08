import { Avatar, Button } from '@chakra-ui/react';
import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { FaBox, FaClipboardList, FaHouse, FaUser } from 'react-icons/fa6';

const LayoutAdmin = () => {
  const path = useLocation();
  const currentNav = path?.pathname.split('/')[2];

  const dashmenu = [
    {
      nav: 'dashboard',
      icon: <FaHouse color="#ffffff" />,
    },
    { nav: 'user', icon: <FaUser color="#ffffff" /> },
    {
      nav: 'produk',
      icon: <FaBox color="#ffffff" />,
    },
    {
      nav: 'laporan',
      icon: <FaClipboardList color="#ffffff" />,
    },
  ];
  return (
    <div className="grid grid-cols-7">
      <section className="sticky top-0 w-full h-screen bg-secondary py-10 flex flex-col justify-between">
        <div>
          <div className="w-full mb-10 px-5">
            <h1 className="font-bold text-[20px] text-center mb-5 rounded-lg bg-white py-2 text-secondary">
              MyKantin
            </h1>
            <div className="w-full flex justify-center">
              <Avatar size={'xl'} />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {dashmenu.map((_, i) => {
              const isSelected = currentNav === _.nav;
              return (
                <Link to={`/admin/${_.nav.toLowerCase()}`}>
                  <Button
                    fontSize={15}
                    key={i}
                    width={'full'}
                    type="button"
                    height="50px"
                    borderRadius={'0px'}
                    transition="height 200ms ease-in-out"
                    backgroundColor={isSelected ? '#e0eaff' : '#1B62D6'}
                    textTransform="capitalize"
                    color={isSelected ? '#1B62D6' : '#ffffff'}
                    variant={isSelected ? 'solid' : 'ghost'}
                    _hover={{
                      height: '55px',
                      backgroundColor: '#3B82F6',
                      transition: 'height 200ms ease-in-out',
                      color: 'white'
                    }}
                  >
                    {_.nav}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col w-full space-y-3 px-5">
          <Link to={'/admin/settings'}>
            <Button
              style={{ textAlign: 'left' }}
              fontSize={15}
              width={'full'}
              type="button"
              height="50px"
              transition="height 200ms ease-in-out"
              textTransform="capitalize"
              // backgroundColor={'#1B62D6'}
              backgroundColor={currentNav === 'settings' ? 'white' : '#1B62D6'}
              color={currentNav === 'settings' ? '#1B62D6' : 'white'}
              variant={'solid'}
              _hover={{
                height: '55px',
                backgroundColor: '#3B82F6',
                transition: 'height 200ms ease-in-out',
                color: 'white'
              }}
            >
              Settings
            </Button>
          </Link>
          <Button
            fontSize={15}
            width={'full'}
            type="button"
            height="50px"
            transition="height 200ms ease-in-out"
            textTransform="capitalize"
            backgroundColor={'#CC0000'}
            color={'#ffffff'}
            variant={'solid'}
            _hover={{
              height: '55px',
              backgroundColor: '#b30000 ',
              transition: 'height 200ms ease-in-out',
            }}
          >
            Log out
          </Button>
        </div>
      </section>

      <section className="col-span-6 w-full h-full p-[40px] bg-[#e0eaff]">
        <Outlet />
      </section>
    </div>
  );
};

export default LayoutAdmin;
