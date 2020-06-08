/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiHome,
  FiSidebar,
  FiUsers,
  FiShoppingCart,
  FiLogOut,
} from 'react-icons/fi';

import { useHistory } from '../../hooks/history';
import { useAuth } from '../../hooks/auth';

import { Container, Content, Icon } from './styles';

interface SideBarProps {
  pathname: string;
}

const SideBar: React.FC<SideBarProps> = ({ pathname }) => {
  const { addPathname } = useHistory();
  const { signOut } = useAuth();

  function handleClickAddPathname(path: string): void {
    addPathname(path);
  }

  return (
    <Container>
      <nav>
        <ul>
          <Content
            onClick={() => handleClickAddPathname('/home')}
            isSelected={pathname === '/home'}
          >
            <Link to="/home">
              <Icon
                left="150%"
                widthProp="120px"
                alignProp="left"
                title="Início"
              >
                <FiSidebar
                  size={30}
                  color={pathname === '/home' ? '#666ffa' : '#9aaabe'}
                />
              </Icon>
            </Link>
          </Content>
          <Content
            onClick={() => handleClickAddPathname('/construction')}
            isSelected={
              pathname === '/construction' ||
              pathname === '/constructions/form' ||
              !!pathname.match('/constructionsdeatail')
            }
          >
            <Link to="/construction">
              <Icon
                left="150%"
                widthProp="120px"
                alignProp="left"
                title="Obras"
              >
                <FiHome
                  size={30}
                  color={
                    pathname === '/construction' ||
                    pathname === '/constructions/form' ||
                    !!pathname.match('/constructionsdeatail')
                      ? '#666ffa'
                      : '#9aaabe'
                  }
                />
              </Icon>
            </Link>
          </Content>
          <Content
            onClick={() => handleClickAddPathname('/supplier')}
            isSelected={
              pathname === '/supplier' || pathname === '/suppliers/form'
            }
          >
            <Link to="/supplier">
              <Icon
                left="150%"
                widthProp="120px"
                alignProp="left"
                title="Fornecedores"
              >
                <FiUsers
                  size={30}
                  color={
                    pathname === '/supplier' || pathname === '/suppliers/form'
                      ? '#666ffa'
                      : '#9aaabe'
                  }
                />
              </Icon>
            </Link>
          </Content>
          <Content
            onClick={() => handleClickAddPathname('/itens/form')}
            isSelected={pathname === '/itens/form'}
          >
            <Link to="/itens/form">
              <Icon
                left="150%"
                widthProp="120px"
                alignProp="left"
                title="Itens"
              >
                <FiShoppingCart
                  size={30}
                  color={pathname === '/itens/form' ? '#666ffa' : '#9aaabe'}
                />
              </Icon>
            </Link>
          </Content>
          <Content onClick={signOut}>
            <a>
              <Icon
                left="150%"
                widthProp="120px"
                alignProp="left"
                title="Itens"
              >
                <FiLogOut size={30} color="#9aaabe" />
              </Icon>
            </a>
          </Content>
        </ul>
      </nav>
    </Container>
  );
};

export default SideBar;
