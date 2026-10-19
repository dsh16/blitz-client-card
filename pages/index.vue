<template>
  <div class="workspace" :class="{ 'menu-collapsed': menuCollapsed }">
    <aside class="sidebar" aria-label="Главное меню">
      <a class="brand" href="#client" aria-label="Blitz — карточка клиента">
        <svg viewBox="0 0 32 34" fill="none" aria-hidden="true">
          <path
            d="M13 7H10a5 5 0 0 0-5 5v12a4 4 0 0 0 4 4h4V13h7v12"
            stroke="white"
            stroke-width="3.2"
            stroke-linejoin="round"
          />
          <path
            d="M20 6h3a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-3V10h-7v13"
            stroke="#ff8b69"
            stroke-width="3.2"
            stroke-linejoin="round"
          />
        </svg>
      </a>
      <nav class="nav-items">
        <button
          v-for="item in navigation"
          :key="item.icon"
          class="nav-item"
          :class="{ active: activeNav === item.icon }"
          :aria-label="item.label"
          :title="item.label"
          @click="navigate(item)"
        >
          <AppIcon :name="item.icon" :size="18" /><span class="nav-tooltip">{{
            item.label
          }}</span>
        </button>
      </nav>
      <div class="sidebar-bottom">
        <button
          class="nav-item"
          aria-label="Помощь"
          title="Помощь"
          @click="openModal('help')"
        >
          <AppIcon name="help" :size="18" />
        </button>
        <button
          class="nav-item"
          :aria-label="menuCollapsed ? 'Развернуть меню' : 'Свернуть меню'"
          title="Свернуть меню"
          @click="menuCollapsed = !menuCollapsed"
        >
          <AppIcon name="logout" :size="18" />
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header class="toolbar">
        <button class="back-link" @click="openModal('clients')">
          <AppIcon name="back" :size="14" /><span>К списку клиентов</span>
        </button>
        <div class="toolbar-actions">
          <div class="dropdown-wrap">
            <button
              class="button icon-button"
              aria-label="Дополнительные действия"
              :aria-expanded="topMenu"
              @click="topMenu = !topMenu"
            >
              <AppIcon name="more" :size="15" />
            </button>
            <div v-if="topMenu" class="dropdown toolbar-dropdown">
              <button @click="exportClient">
                <AppIcon name="logout" :size="15" />Скачать карточку
              </button>
              <button
                @click="
                  topMenu = false;
                  openModal('reset');
                "
              >
                <AppIcon name="back" :size="15" />Сбросить изменения
              </button>
            </div>
          </div>
          <button class="button edit-button" @click="openModal('edit')">
            <AppIcon name="edit" :size="13" /><span>Редактировать</span>
          </button>
          <button class="button button-primary" @click="openModal('booking')">
            <AppIcon name="logout" :size="13" /><span>Записать клиента</span>
          </button>
        </div>
      </header>

      <section
        id="client"
        class="panel client-panel"
        aria-labelledby="client-name"
      >
        <div class="client-information">
          <div class="client-heading">
            <div class="client-avatar">{{ initials }}</div>
            <div class="client-title">
              <p class="eyebrow">Клиент</p>
              <h1 id="client-name">
                {{ client.name
                }}<button
                  class="copy-button"
                  title="Скопировать имя"
                  aria-label="Скопировать имя клиента"
                  @click="copyName"
                >
                  <AppIcon name="copy" :size="14" />
                </button>
              </h1>
              <span class="type-badge">{{ client.type }}</span>
            </div>
          </div>
          <div class="contact-grid">
            <div class="contact-item">
              <span class="small-icon"
                ><AppIcon name="phone" :size="15"
              /></span>
              <div>
                <p class="field-label">Телефон</p>
                <a
                  v-if="client.phone"
                  :href="'tel:' + client.phone"
                  class="field-value"
                  >{{ client.phone }}</a
                >
                <p v-else class="field-value">Не указан</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="small-icon"><AppIcon name="mail" :size="15" /></span>
              <div>
                <p class="field-label">Email</p>
                <a
                  v-if="client.email"
                  :href="'mailto:' + client.email"
                  class="field-value"
                  >{{ client.email }}</a
                >
                <p v-else class="field-value">Не указан</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="small-icon"
                ><AppIcon name="calendar" :size="15"
              /></span>
              <div>
                <p class="field-label">Первый визит</p>
                <p class="field-value">21 сент. 2026 г., 16:00</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="small-icon"
                ><AppIcon name="calendar" :size="15"
              /></span>
              <div>
                <p class="field-label">Последний визит</p>
                <p class="field-value">21 сент. 2026 г., 16:00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="client-overview">
          <div class="blacklist-card" :class="{ 'is-blocked': blacklisted }">
            <div>
              <h2>Чёрный список</h2>
              <p>
                {{
                  blacklisted
                    ? "Клиенту недоступна онлайн-запись."
                    : "Клиент автоматически записывается и не приезжает."
                }}
              </p>
            </div>
            <button
              class="switch"
              :class="{ 'is-on': blacklisted }"
              role="switch"
              :aria-checked="blacklisted"
              aria-label="Добавить клиента в чёрный список"
              @click="toggleBlacklist"
            >
              <span />
            </button>
          </div>
          <div class="metrics">
            <div class="metric-card">
              <p class="field-label">Потрачено всего</p>
              <div class="metric-value">
                <AppIcon name="wallet" :size="17" /><strong>2 325 ₽</strong>
              </div>
            </div>
            <div class="metric-card">
              <p class="field-label">Количество визитов</p>
              <div class="metric-value">
                <AppIcon name="bars" :size="17" /><strong>1</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="vehicle"
        class="panel section-panel vehicle-panel"
        aria-labelledby="vehicle-title"
      >
        <div class="section-header">
          <div>
            <h2 id="vehicle-title">Информация об автомобиле</h2>
            <p class="section-description">
              Данные автомобиля и важные особенности для обслуживания.
            </p>
          </div>
          <button
            class="button button-outline"
            aria-label="Редактировать автомобиль"
            @click="openModal('vehicle')"
          >
            <AppIcon name="edit" :size="13" />Редактировать
          </button>
        </div>
        <dl class="vehicle-details">
          <div class="vehicle-field">
            <dt><AppIcon name="car" :size="14" />Госномер</dt>
            <dd :class="{ 'is-empty': !vehicle.licensePlate }">
              <span :class="{ 'license-plate': vehicle.licensePlate }">{{
                vehicle.licensePlate || "Не указан"
              }}</span>
            </dd>
          </div>
          <div class="vehicle-field">
            <dt>Марка и модель</dt>
            <dd :class="{ 'is-empty': !vehicle.brand && !vehicle.model }">
              {{ vehicleName || "Не указаны" }}
            </dd>
          </div>
          <div class="vehicle-field">
            <dt>Тип кузова</dt>
            <dd :class="{ 'is-empty': !vehicle.bodyType }">
              {{ vehicle.bodyType || "Не указан" }}
            </dd>
          </div>
          <div class="vehicle-field vehicle-features">
            <dt>Особенности автомобиля</dt>
            <dd
              :class="{ 'is-empty': !vehicle.features }"
              v-text="vehicle.features || 'Особенности не указаны'"
            ></dd>
          </div>
        </dl>
      </section>

      <section
        id="tags"
        class="panel section-panel"
        aria-labelledby="tags-title"
      >
        <div class="section-header">
          <div>
            <h2 id="tags-title">Категории клиентов</h2>
            <p class="section-description">
              Категории помогают быстро находить клиентов и сегментировать базу.
            </p>
          </div>
          <button class="button button-outline" @click="openModal('tag')">
            <AppIcon name="plus" :size="14" />Добавить категорию
          </button>
        </div>
        <div v-if="!tags.length" class="empty-state">
          <span class="empty-icon"><AppIcon name="tag" :size="21" /></span>
          <div>
            <h3>Категории не назначены</h3>
            <p>
              Добавьте категории, чтобы отмечать важные особенности клиента.
            </p>
          </div>
        </div>
        <div v-else class="tag-list">
          <span
            v-for="(tag, index) in tags"
            :key="tag.name"
            class="client-tag"
            :style="{ '--tag-color': tag.color }"
            ><AppIcon name="tag" :size="14" />{{ tag.name
            }}<button
              :aria-label="'Удалить категорию ' + tag.name"
              @click="removeTag(index)"
            >
              <AppIcon name="close" :size="13" /></button></span
          ><span class="tag-hint">Назначено категорий: {{ tags.length }}</span>
        </div>
      </section>

      <section
        id="subscriptions"
        class="panel section-panel"
        aria-labelledby="subscriptions-title"
      >
        <div class="section-header">
          <div>
            <h2 id="subscriptions-title">Абонементы</h2>
            <p class="section-description">
              Действующие и завершённые абонементы клиента.
            </p>
          </div>
          <button
            class="button button-outline"
            @click="openModal('subscription')"
          >
            <AppIcon name="plus" :size="14" />Добавить абонемент
          </button>
        </div>
        <div v-if="!subscriptions.length" class="empty-state">
          <span class="empty-icon"><AppIcon name="card" :size="21" /></span>
          <div>
            <h3>Абонементов пока нет</h3>
            <p>Вы можете оформить абонемент для этого клиента.</p>
          </div>
        </div>
        <div v-else class="subscription-list">
          <div
            v-for="(subscription, index) in subscriptions"
            :key="index"
            class="subscription-item"
          >
            <span class="empty-icon"><AppIcon name="card" :size="21" /></span>
            <div>
              <h3>{{ subscription.name }}</h3>
              <p>
                {{ subscription.count }} посещений ·
                {{ formatMoney(subscription.price) }}
              </p>
            </div>
            <span class="status-badge">Действует</span>
          </div>
        </div>
      </section>

      <section
        id="visits"
        class="panel visits-panel"
        aria-labelledby="visits-title"
      >
        <div class="section-header">
          <div>
            <h2 id="visits-title">История посещений</h2>
            <p class="section-description">
              Список всех визитов клиента с оказанными услугами.
            </p>
          </div>
          <span class="visit-counter"
            >{{ visits.length }}
            {{ visits.length === 1 ? "визит" : "визита" }}</span
          >
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Дата и время</th>
                <th>Услуги</th>
                <th>Сумма</th>
                <th>Сотрудник</th>
                <th>Филиал</th>
                <th class="actions-heading">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(visit, index) in visits" :key="visit.id">
                <td>
                  <span>{{ visit.date }}</span
                  ><small>{{ visit.day }}</small>
                </td>
                <td class="service-cell">
                  <span v-for="service in visit.services" :key="service">{{
                    service
                  }}</span
                  ><small v-if="visit.planned" class="planned-label"
                    >Предстоящая запись</small
                  >
                </td>
                <td class="money-cell">{{ formatMoney(visit.amount) }}</td>
                <td>
                  <div class="employee">
                    <span class="employee-avatar">ИВ</span>
                    <div><span>Иванов С.</span><small>Мастер</small></div>
                  </div>
                </td>
                <td>Основной филиал</td>
                <td class="row-action">
                  <button
                    class="button table-menu-button"
                    :aria-label="'Подробнее о визите ' + visit.date"
                    @click="
                      selectedVisit = index;
                      openModal('visit');
                    "
                  >
                    <AppIcon name="more" :size="14" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <span>Показано {{ visits.length }} из {{ visits.length }}</span
          ><button
            class="button pagination-button"
            disabled
            aria-label="Предыдущая страница"
          >
            <AppIcon name="chevron" :size="13" class="previous" /></button
          ><button
            class="button pagination-button"
            disabled
            aria-label="Следующая страница"
          >
            <AppIcon name="chevron" :size="13" />
          </button>
        </div>
      </section>
      <p class="mobile-footer">Blitz · Управление клиентами</p>
    </main>

    <transition name="toast"
      ><div v-if="toast" class="toast-message" role="status">
        <span class="toast-check"><AppIcon name="check" :size="15" /></span
        >{{ toast }}
      </div></transition
    >

    <transition name="modal">
      <div v-if="modal" class="modal-overlay" @click.self="closeModal">
        <section
          class="modal-card"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="'modal-title'"
          tabindex="-1"
        >
          <div class="modal-heading">
            <div>
              <span class="modal-eyebrow">КАРТОЧКА КЛИЕНТА</span>
              <h2 id="modal-title">{{ modalTitle }}</h2>
            </div>
            <button
              class="modal-close"
              aria-label="Закрыть окно"
              @click="closeModal"
            >
              <AppIcon name="close" :size="21" />
            </button>
          </div>
          <form
            v-if="modal === 'edit'"
            class="modal-body"
            @submit.prevent="saveClient"
          >
            <label class="form-field"
              >Имя клиента<input
                v-model.trim="form.name"
                required
                maxlength="100"
                placeholder="Введите имя клиента"
                autofocus
            /></label>
            <label class="form-field"
              >Тип клиента<select v-model="form.type">
                <option>Юридическое лицо</option>
                <option>Физическое лицо</option>
              </select></label
            >
            <div class="form-columns">
              <label class="form-field"
                >Телефон<input
                  v-model.trim="form.phone"
                  type="tel"
                  placeholder="+7 (999) 000-00-00" /></label
              ><label class="form-field"
                >Email<input
                  v-model.trim="form.email"
                  type="email"
                  placeholder="client@example.ru"
              /></label>
            </div>
            <div class="modal-footer">
              <button type="button" class="button" @click="closeModal">
                Отмена</button
              ><button class="button button-primary" type="submit">
                Сохранить изменения
              </button>
            </div>
          </form>
          <form
            v-else-if="modal === 'vehicle'"
            class="modal-body"
            @submit.prevent="saveVehicle"
          >
            <label class="form-field"
              >Госномер<input
                v-model.trim="form.licensePlate"
                maxlength="20"
                placeholder="Например, А123ВС 77"
                autocomplete="off"
            /></label>
            <div class="form-columns">
              <label class="form-field"
                >Марка<input
                  v-model.trim="form.brand"
                  maxlength="60"
                  placeholder="Например, Toyota"
              /></label>
              <label class="form-field"
                >Модель<input
                  v-model.trim="form.model"
                  maxlength="60"
                  placeholder="Например, Camry"
              /></label>
            </div>
            <div class="form-field">
              <label for="vehicle-body-type">Тип кузова</label>
              <select id="vehicle-body-type" v-model="form.bodyType">
                <option value="">Не указан</option>
                <option v-for="type in bodyTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label for="vehicle-features">Особенности автомобиля</label>
              <textarea
                id="vehicle-features"
                v-model.trim="form.features"
                rows="4"
                maxlength="1000"
                placeholder="Цвет, плёнка, повреждения или пожелания по уходу"
              ></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="button" @click="closeModal">
                Отмена</button
              ><button class="button button-primary" type="submit">
                Сохранить автомобиль
              </button>
            </div>
          </form>
          <form
            v-else-if="modal === 'tag'"
            class="modal-body"
            @submit.prevent="addTag"
          >
            <p class="modal-description">
              Отметьте особенности клиента — так его будет проще найти в базе.
            </p>
            <label class="form-field"
              >Название категории<input
                v-model.trim="form.tag"
                required
                maxlength="32"
                placeholder="Например, постоянный клиент"
            /></label>
            <span class="form-label">Цвет категории</span>
            <div class="color-options">
              <button
                v-for="color in colors"
                :key="color"
                type="button"
                class="color-option"
                :class="{ selected: form.color === color }"
                :style="{ backgroundColor: color }"
                :aria-label="'Выбрать цвет ' + color"
                :aria-pressed="form.color === color"
                @click="form.color = color"
              >
                <AppIcon v-if="form.color === color" name="check" :size="16" />
              </button>
            </div>
            <p v-if="formError" class="form-error">{{ formError }}</p>
            <div class="modal-footer">
              <button type="button" class="button" @click="closeModal">
                Отмена</button
              ><button class="button button-primary" type="submit">
                Добавить категорию
              </button>
            </div>
          </form>
          <form
            v-else-if="modal === 'subscription'"
            class="modal-body"
            @submit.prevent="addSubscription"
          >
            <p class="modal-description">
              Новый абонемент будет закреплён за этим клиентом.
            </p>
            <label class="form-field"
              >Название абонемента<input
                v-model.trim="form.name"
                required
                maxlength="80"
                placeholder="Например, комплексный уход"
            /></label>
            <div class="form-columns">
              <label class="form-field"
                >Количество посещений<input
                  v-model.number="form.count"
                  type="number"
                  min="1"
                  max="100"
                  required /></label
              ><label class="form-field"
                >Стоимость, ₽<input
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  max="10000000"
                  required
              /></label>
            </div>
            <div class="modal-footer">
              <button type="button" class="button" @click="closeModal">
                Отмена</button
              ><button class="button button-primary" type="submit">
                Оформить абонемент
              </button>
            </div>
          </form>
          <form
            v-else-if="modal === 'booking'"
            class="modal-body"
            @submit.prevent="bookVisit"
          >
            <div v-if="blacklisted" class="form-warning">
              Клиент в чёрном списке. Сначала отключите ограничение в карточке
              клиента.
            </div>
            <p class="booking-client">
              <span class="mini-avatar">{{ initials }}</span
              >{{ client.name }}
            </p>
            <label class="form-field"
              >Услуга<select v-model="form.service">
                <option>Полировка пластика</option>
                <option>Комплекс двухфазный (кузов, салон)</option>
                <option>Комплексный уход</option>
              </select></label
            >
            <div class="form-columns">
              <label class="form-field"
                >Дата<input v-model="form.date" type="date" required /></label
              ><label class="form-field"
                >Время<input v-model="form.time" type="time" required
              /></label>
            </div>
            <label class="form-field"
              >Сотрудник<select>
                <option>Иванов С. · Мастер</option>
              </select></label
            >
            <p class="location-note">
              <AppIcon name="bag" :size="15" />Основной филиал
            </p>
            <div class="modal-footer">
              <button type="button" class="button" @click="closeModal">
                Отмена</button
              ><button
                class="button button-primary"
                type="submit"
                :disabled="blacklisted"
              >
                Записать клиента
              </button>
            </div>
          </form>
          <div v-else-if="modal === 'visit'" class="modal-body">
            <span class="status-badge">{{
              visits[selectedVisit].planned ? "Запланирован" : "Визит завершён"
            }}</span>
            <dl class="detail-list">
              <div>
                <dt>Дата и время</dt>
                <dd>{{ visits[selectedVisit].date }}</dd>
              </div>
              <div>
                <dt>Услуги</dt>
                <dd>{{ visits[selectedVisit].services.join(", ") }}</dd>
              </div>
              <div>
                <dt>Сотрудник</dt>
                <dd>Иванов С. · Мастер</dd>
              </div>
              <div>
                <dt>Филиал</dt>
                <dd>Основной филиал</dd>
              </div>
              <div>
                <dt>Сумма</dt>
                <dd>{{ formatMoney(visits[selectedVisit].amount) }}</dd>
              </div>
            </dl>
            <div class="modal-footer">
              <button
                v-if="visits[selectedVisit].planned"
                class="button danger-button"
                @click="cancelVisit"
              >
                Отменить запись</button
              ><button class="button button-primary" @click="closeModal">
                Готово
              </button>
            </div>
          </div>
          <div v-else-if="modal === 'clients'" class="modal-body">
            <label class="search-field"
              ><AppIcon name="search" :size="17" /><input
                v-model="clientSearch"
                placeholder="Поиск по имени, телефону или email"
                aria-label="Поиск клиентов" /></label
            ><button
              v-if="clientMatchesSearch"
              class="client-search-result"
              @click="closeModal"
            >
              <span class="client-avatar">{{ initials }}</span
              ><span
                ><strong>{{ client.name }}</strong
                ><small>{{ client.type }}</small></span
              ><AppIcon name="chevron" :size="17" />
            </button>
            <p v-else class="no-results">Клиенты не найдены</p>
            <p class="modal-description">В базе 1 клиент</p>
          </div>
          <div v-else-if="modal === 'stats'" class="modal-body">
            <p class="modal-description">
              Статистика завершённых визитов клиента.
            </p>
            <dl class="detail-list">
              <div>
                <dt>Потрачено всего</dt>
                <dd>2 325 ₽</dd>
              </div>
              <div>
                <dt>Завершённых визитов</dt>
                <dd>1</dd>
              </div>
              <div>
                <dt>Средний чек</dt>
                <dd>2 325 ₽</dd>
              </div>
              <div>
                <dt>Предстоящих записей</dt>
                <dd>{{ visits.filter((v) => v.planned).length }}</dd>
              </div>
            </dl>
            <div class="modal-footer">
              <button class="button button-primary" @click="closeModal">
                Готово
              </button>
            </div>
          </div>
          <div v-else-if="modal === 'staff'" class="modal-body">
            <div class="staff-profile">
              <span class="employee-avatar">ИВ</span>
              <div>
                <h3>Иванов С.</h3>
                <p>Мастер · Основной филиал</p>
              </div>
            </div>
            <p class="modal-description">
              Специалист, обслуживавший клиента во время последнего визита.
            </p>
            <div class="modal-footer">
              <button
                class="button button-primary"
                @click="openModal('booking')"
              >
                Записать к мастеру
              </button>
            </div>
          </div>
          <div v-else-if="modal === 'notifications'" class="modal-body">
            <div class="notification-empty">
              <span class="empty-icon"><AppIcon name="bell" :size="24" /></span>
              <h3>Новых уведомлений нет</h3>
              <p>Здесь появятся уведомления о записях клиента.</p>
            </div>
          </div>
          <div v-else-if="modal === 'settings'" class="modal-body">
            <p class="modal-description">
              Изменения карточки сохраняются в этом браузере автоматически.
            </p>
            <div class="setting-row">
              <div>
                <h3>Боковое меню</h3>
                <p>Показывать навигацию по разделам</p>
              </div>
              <button
                class="switch"
                :class="{ 'is-on': !menuCollapsed }"
                role="switch"
                :aria-checked="!menuCollapsed"
                aria-label="Показывать боковое меню"
                @click="menuCollapsed = !menuCollapsed"
              >
                <span />
              </button>
            </div>
            <div class="modal-footer">
              <button class="button button-primary" @click="closeModal">
                Готово
              </button>
            </div>
          </div>
          <div v-else-if="modal === 'help'" class="modal-body help-body">
            <p>В карточке собрана информация о клиенте и его посещениях.</p>
            <ul>
              <li>
                <strong>Редактировать</strong> — изменить имя и контактные
                данные.
              </li>
              <li>
                <strong>Записать клиента</strong> — выбрать услугу, дату и
                время.
              </li>
              <li>
                <strong>Категории и абонементы</strong> — добавить особенности и
                оформить пакет посещений.
              </li>
            </ul>
            <p class="modal-description">
              Это локальная версия: данные сохраняются в вашем браузере и не
              отправляются на сервер.
            </p>
          </div>
          <div v-else-if="modal === 'reset'" class="modal-body">
            <p class="modal-description">
              Вернуть карточку к исходному состоянию? Добавленные категории,
              абонементы, записи и данные автомобиля будут удалены из этого
              браузера.
            </p>
            <div class="modal-footer">
              <button class="button" @click="closeModal">Отмена</button
              ><button class="button button-primary" @click="resetData">
                Сбросить изменения
              </button>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
const initialClient = () => ({
  name: "(КА) ИП Андреева Л.С.",
  type: "Юридическое лицо",
  phone: "",
  email: "",
});
const initialVehicle = () => ({
  licensePlate: "",
  brand: "",
  model: "",
  bodyType: "",
  features: "",
});
const initialVisits = () => [
  {
    id: 1,
    date: "21 сент. 2026 г., 16:00",
    day: "Пн",
    services: ["Полировка пластика,", "Комплекс двухфазный (кузов, салон)"],
    amount: 2325,
    planned: false,
  },
];
export default {
  data() {
    return {
      client: initialClient(),
      vehicle: initialVehicle(),
      bodyTypes: [
        "Седан",
        "Хэтчбек",
        "Универсал",
        "Лифтбек",
        "Купе",
        "Кабриолет",
        "Кроссовер",
        "Внедорожник",
        "Минивэн",
        "Фургон",
        "Пикап",
        "Другое",
      ],
      visits: initialVisits(),
      tags: [],
      subscriptions: [],
      blacklisted: false,
      menuCollapsed: false,
      activeNav: "calendar",
      topMenu: false,
      modal: null,
      form: {},
      formError: "",
      toast: "",
      toastTimer: null,
      selectedVisit: 0,
      clientSearch: "",
      colors: [
        "#167887",
        "#ea785c",
        "#7e74b4",
        "#4f94bf",
        "#b48e45",
        "#638b68",
      ],
      navigation: [
        { icon: "calendar", label: "Записи" },
        { icon: "users", label: "Клиенты" },
        { icon: "network", label: "Категории клиентов" },
        { icon: "team", label: "Сотрудники" },
        { icon: "chart", label: "Аналитика" },
        { icon: "card", label: "Абонементы" },
        { icon: "wallet", label: "Финансы" },
        { icon: "settings", label: "Настройки" },
        { icon: "bell", label: "Уведомления" },
      ],
    };
  },
  computed: {
    vehicleName() {
      return [this.vehicle.brand, this.vehicle.model].filter(Boolean).join(" ");
    },
    initials() {
      return this.client.name === "(КА) ИП Андреева Л.С."
        ? "АЛ"
        : this.client.name
            .replace(/\([^)]*\)|\bИП\b/g, "")
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    },
    modalTitle() {
      return {
        edit: "Редактировать клиента",
        vehicle: "Данные автомобиля",
        tag: "Добавить категорию",
        subscription: "Добавить абонемент",
        booking: "Записать клиента",
        visit: "Информация о визите",
        clients: "Список клиентов",
        stats: "Статистика клиента",
        staff: "Сотрудник",
        notifications: "Уведомления",
        settings: "Настройки",
        help: "Помощь",
        reset: "Сбросить изменения",
      }[this.modal];
    },
    clientMatchesSearch() {
      return [this.client.name, this.client.phone, this.client.email].some(
        (value) => value.toLowerCase().includes(this.clientSearch.toLowerCase())
      );
    },
  },
  mounted() {
    try {
      const saved = JSON.parse(localStorage.getItem("blitz-client-card-v1"));
      if (
        saved &&
        saved.client &&
        Array.isArray(saved.visits) &&
        saved.visits.length
      ) {
        this.client = { ...initialClient(), ...saved.client };
        this.vehicle = { ...initialVehicle(), ...saved.vehicle };
        this.visits = saved.visits;
        this.tags = saved.tags || [];
        this.subscriptions = saved.subscriptions || [];
        this.blacklisted = !!saved.blacklisted;
      }
    } catch (_) {
      /* Keep the initial card when browser storage is unavailable. */
    }
    document.addEventListener("keydown", this.onKeydown);
    document.addEventListener("click", this.closeTopMenu);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeydown);
    document.removeEventListener("click", this.closeTopMenu);
    clearTimeout(this.toastTimer);
    document.body.style.overflow = "";
  },
  methods: {
    formatMoney(value) {
      return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
    },
    persist() {
      try {
        localStorage.setItem(
          "blitz-client-card-v1",
          JSON.stringify({
            client: this.client,
            vehicle: this.vehicle,
            visits: this.visits,
            tags: this.tags,
            subscriptions: this.subscriptions,
            blacklisted: this.blacklisted,
          })
        );
      } catch (_) {
        this.notify("Не удалось сохранить данные в браузере");
      }
    },
    notify(message) {
      clearTimeout(this.toastTimer);
      this.toast = message;
      this.toastTimer = setTimeout(() => {
        this.toast = "";
      }, 3400);
    },
    openModal(type) {
      this.lastFocusedElement = document.activeElement;
      this.modal = type;
      this.topMenu = false;
      this.formError = "";
      const now = new Date();
      const date = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");
      this.form =
        type === "edit"
          ? { ...this.client }
          : type === "vehicle"
          ? { ...this.vehicle }
          : type === "tag"
          ? { tag: "", color: this.colors[0] }
          : type === "subscription"
          ? { name: "", count: 5, price: 0 }
          : { service: "Полировка пластика", date, time: "16:00" };
      document.body.style.overflow = "hidden";
      this.$nextTick(() => {
        const input = this.$el.querySelector(
          ".modal-card input, .modal-card select, .modal-card textarea"
        );
        (input || this.$el.querySelector(".modal-card")).focus();
      });
    },
    closeModal() {
      this.modal = null;
      document.body.style.overflow = "";
      if (this.lastFocusedElement) this.lastFocusedElement.focus();
    },
    onKeydown(event) {
      if (event.key === "Escape") {
        this.closeModal();
        this.topMenu = false;
      }
      if (event.key === "Tab" && this.modal) {
        const elements = Array.from(
          this.$el.querySelectorAll(
            '.modal-card button:not([disabled]), .modal-card input, .modal-card select, .modal-card textarea, .modal-card [tabindex="0"]'
          )
        );
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    closeTopMenu(event) {
      if (!event.target.closest(".dropdown-wrap")) this.topMenu = false;
    },
    saveClient() {
      if (!this.form.name) return;
      this.client = { ...this.form };
      this.persist();
      this.closeModal();
      this.notify("Данные клиента сохранены");
    },
    saveVehicle() {
      this.vehicle = {
        ...this.form,
        licensePlate: this.form.licensePlate.toUpperCase(),
      };
      this.persist();
      this.closeModal();
      this.notify("Данные автомобиля сохранены");
    },
    addTag() {
      if (!this.form.tag) return;
      if (
        this.tags.some(
          (tag) => tag.name.toLowerCase() === this.form.tag.toLowerCase()
        )
      ) {
        this.formError = "Такая категория уже назначена клиенту";
        return;
      }
      this.tags.push({ name: this.form.tag, color: this.form.color });
      this.persist();
      this.closeModal();
      this.notify("Категория добавлена");
    },
    removeTag(index) {
      this.tags.splice(index, 1);
      this.persist();
      this.notify("Категория удалена");
    },
    addSubscription() {
      this.subscriptions.push({
        name: this.form.name,
        count: this.form.count,
        price: this.form.price,
      });
      this.persist();
      this.closeModal();
      this.notify("Абонемент оформлен");
    },
    toggleBlacklist() {
      this.blacklisted = !this.blacklisted;
      this.persist();
      this.notify(
        this.blacklisted
          ? "Клиент добавлен в чёрный список"
          : "Клиент удалён из чёрного списка"
      );
    },
    bookVisit() {
      if (this.blacklisted) return;
      const date = new Date(this.form.date + "T" + this.form.time);
      this.visits.push({
        id: Date.now(),
        date:
          date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }) +
          ", " +
          this.form.time,
        day: date
          .toLocaleDateString("ru-RU", { weekday: "short" })
          .replace(/^./, (c) => c.toUpperCase()),
        services: [this.form.service],
        amount: 0,
        planned: true,
      });
      this.persist();
      this.closeModal();
      this.notify(
        "Клиент записан на " +
          this.form.date.split("-").reverse().join(".") +
          " в " +
          this.form.time
      );
    },
    cancelVisit() {
      this.visits.splice(this.selectedVisit, 1);
      this.persist();
      this.closeModal();
      this.notify("Запись отменена");
    },
    async copyName() {
      try {
        await navigator.clipboard.writeText(this.client.name);
        this.notify("Имя клиента скопировано");
      } catch (_) {
        this.notify("Скопируйте имя: " + this.client.name);
      }
    },
    navigate(item) {
      this.activeNav = item.icon;
      const sections = {
        calendar: "visits",
        network: "tags",
        card: "subscriptions",
      };
      if (sections[item.icon]) {
        document
          .getElementById(sections[item.icon])
          .scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      this.openModal(
        {
          users: "clients",
          team: "staff",
          chart: "stats",
          wallet: "stats",
          settings: "settings",
          bell: "notifications",
        }[item.icon]
      );
    },
    exportClient() {
      const blob = new Blob(
        [
          JSON.stringify(
            {
              client: this.client,
              vehicle: this.vehicle,
              tags: this.tags,
              subscriptions: this.subscriptions,
              visits: this.visits,
            },
            null,
            2
          ),
        ],
        { type: "application/json" }
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "client-card.json";
      link.click();
      URL.revokeObjectURL(url);
      this.topMenu = false;
      this.notify("Карточка клиента скачана");
    },
    resetData() {
      this.client = initialClient();
      this.vehicle = initialVehicle();
      this.visits = initialVisits();
      this.tags = [];
      this.subscriptions = [];
      this.blacklisted = false;
      this.persist();
      this.closeModal();
      this.notify("Исходная карточка восстановлена");
    },
  },
};
</script>
